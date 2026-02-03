// Organisation Chart App
let svg, g, root, treeLayout, zoom;
let currentData = JSON.parse(JSON.stringify(orgData));
let editMode = false;
let selectedNode = null;
let nodeIdCounter = 100;

// Undo/Redo history
const MAX_HISTORY = 50; // Support up to 50 undo levels
let historyStack = [];
let redoStack = [];
let isUndoing = false;

// Dimensions
const width = window.innerWidth;
const height = window.innerHeight - 70;
const nodeWidth = 180;
const nodeHeight = 80;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Save initial state
    saveToHistory();
    initChart();
    populateParentSelects();
    updateUndoRedoButtons();
    window.addEventListener('resize', () => {
        d3.select("#chart-container svg").remove();
        initChart();
    });
});

function initChart() {
    // Clear existing
    d3.select("#chart-container").selectAll("*").remove();
    
    // Create SVG
    svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [0, 0, width, height]);

    // Add zoom behavior
    zoom = d3.zoom()
        .scaleExtent([0.3, 3])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    // Create main group
    g = svg.append("g")
        .attr("transform", `translate(${width / 2}, 80)`);

    // Create tree layout - horizontal spacing for siblings
    treeLayout = d3.tree()
        .nodeSize([nodeWidth + 30, nodeHeight + 60]);

    // Render
    update(currentData);
}

function update(data) {
    // Create hierarchy
    root = d3.hierarchy(data);
    
    // Check if we should use vertical layout (HODs only mode) or horizontal
    const useVerticalLayout = isHODOnlyMode(root);
    
    // Update layout indicator
    const indicator = document.getElementById('layout-indicator');
    if (indicator) {
        if (useVerticalLayout) {
            indicator.classList.add('active');
            indicator.textContent = '📋 Vertical Layout (HODs Only)';
        } else {
            indicator.classList.remove('active');
        }
    }
    
    if (useVerticalLayout) {
        // Vertical stacking layout - arrange nodes in a single column
        applyVerticalLayout(root);
    } else {
        // Standard tree layout - horizontal arrangement
        treeLayout.nodeSize([nodeHeight + 30, nodeWidth + 50]);
        treeLayout(root);
    }
    
    // Center the tree
    let offsetX, offsetY;
    if (useVerticalLayout) {
        // Calculate bounds for indented layout
        const maxDepth = Math.max(...root.descendants().map(d => d.depth));
        const treeWidth = maxDepth * 40 + nodeWidth;
        offsetX = (width - treeWidth) / 2; // Center the indented tree
        offsetY = 50;
    } else {
        const bounds = getTreeBounds(root);
        offsetX = 100;
        offsetY = height / 2 - (bounds.maxX + bounds.minX) / 2;
    }
    
    // Links
    const links = g.selectAll(".link")
        .data(root.links())
        .join("path")
        .attr("class", "link")
        .attr("d", d => {
            if (useVerticalLayout) {
                // Vertical layout: straight lines down
                return d3.linkVertical()
                    .x(n => n.x + offsetX)
                    .y(n => n.y + offsetY)(d);
            } else {
                // Horizontal layout: left to right
                return d3.linkHorizontal()
                    .x(n => n.y + offsetX)
                    .y(n => n.x + offsetY)(d);
            }
        });

    // Nodes
    const nodes = g.selectAll(".node")
        .data(root.descendants(), d => d.data.id) // Use ID as key
        .join("g")
        .attr("class", d => `node ${d.data.dept || 'default'}`)
        .attr("transform", d => {
            const tx = useVerticalLayout ? d.x + offsetX : d.y + offsetX;
            const ty = useVerticalLayout ? d.y + offsetY : d.x + offsetY - nodeHeight/2;
            return `translate(${tx}, ${ty})`;
        })
        .on("click", handleNodeClick)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);

    // Node rectangles
    nodes.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight);

    // Role text - at top
    nodes.append("text")
        .attr("class", "role")
        .attr("x", nodeWidth / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text(d => d.data.role);

    // Name text - middle (main focus)
    nodes.append("text")
        .attr("class", "name")
        .attr("x", nodeWidth / 2)
        .attr("y", 45)
        .attr("text-anchor", "middle")
        .text(d => d.data.name);

    // Contact text - bottom
    nodes.append("text")
        .attr("class", "contact")
        .attr("x", nodeWidth / 2)
        .attr("y", 68)
        .attr("text-anchor", "middle")
        .text(d => d.data.contact || "");

    // Collapse indicator (+/-)
    nodes.filter(d => d.children || d._children)
        .append("circle")
        .attr("cx", useVerticalLayout ? nodeWidth + 15 : nodeWidth + 15)
        .attr("cy", useVerticalLayout ? nodeHeight / 2 : nodeHeight / 2)
        .attr("r", 10)
        .attr("fill", "#667eea")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    nodes.filter(d => d.children || d._children)
        .append("text")
        .attr("x", useVerticalLayout ? nodeWidth + 15 : nodeWidth + 15)
        .attr("y", useVerticalLayout ? nodeHeight / 2 + 4 : nodeHeight / 2 + 4)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text(d => d.children ? "−" : "+");
}

// Check if a node is an HOD (Department Head)
function isHODNode(node) {
    // Check by ID - these are the HOD node IDs
    const hodIds = ['ceo', 'gm', 'cao', 'training', 'event', 'project', 'om', 'eng', 'it', 'admin', 'finance', 'procurement', 'hr'];
    
    // Check by role keywords - more flexible matching
    const hodKeywords = ['CEO', 'General Manager', 'Chief Administrative', 'Head', 'Coordinator'];
    
    const nodeId = node.data ? node.data.id : node.id;
    const nodeRole = node.data ? node.data.role : node.role;
    
    // Check ID match
    if (hodIds.includes(nodeId)) return true;
    
    // Check role contains HOD keywords
    if (nodeRole) {
        const roleUpper = nodeRole.toUpperCase();
        if (hodKeywords.some(keyword => roleUpper.includes(keyword.toUpperCase()))) return true;
    }
    
    return false;
}

// Check if current view shows only HODs (vertical layout mode)
function isHODOnlyMode(rootNode) {
    // Traverse visible nodes
    function checkVisible(node) {
        if (!isHODNode(node)) return false; // Found non-HOD visible
        
        if (node.children) {
            for (let child of node.children) {
                if (!checkVisible(child)) return false;
            }
        }
        return true;
    }
    
    return checkVisible(rootNode);
}

// Apply vertical stacking layout with indentation
function applyVerticalLayout(rootNode) {
    const levelHeight = nodeHeight + 50;
    const indentAmount = 40; // Horizontal indent per level
    
    // Assign positions with indentation based on depth
    function traverseAndPosition(node, depth) {
        // Position this node with indentation
        node.x = depth * indentAmount; // Indent based on hierarchy level
        
        // Calculate Y position - we'll do a second pass for this
        
        // Recursively position all visible children
        if (node.children) {
            node.children.forEach(child => {
                traverseAndPosition(child, depth + 1);
            });
        }
    }
    
    // First pass: set X positions (indentation)
    traverseAndPosition(rootNode, 0);
    
    // Second pass: assign Y positions sequentially based on tree order
    let currentY = 0;
    function assignY(node) {
        node.y = currentY;
        currentY += levelHeight;
        
        if (node.children) {
            node.children.forEach(assignY);
        }
    }
    assignY(rootNode);
}

function getTreeBounds(root) {
    let minX = Infinity, maxX = -Infinity;
    
    root.descendants().forEach(d => {
        // For tree layout, d.x is the vertical position (in standard d3.tree)
        minX = Math.min(minX, d.x);
        maxX = Math.max(maxX, d.x);
    });
    return { minX, maxX };
}

function handleNodeClick(event, d) {
    if (editMode) {
        // In edit mode, open edit modal
        selectedNode = d;
        openEditModal(d.data);
    } else {
        // Normal mode: toggle collapse
        toggleNode(d);
    }
}

function toggleNode(d) {
    // Find the corresponding node in currentData and toggle it
    const nodeData = findNode(currentData, d.data.id);
    if (nodeData) {
        if (nodeData.children) {
            nodeData._children = nodeData.children;
            nodeData.children = null;
        } else if (nodeData._children) {
            nodeData.children = nodeData._children;
            nodeData._children = null;
        }
    }
    
    update(currentData);
}

// (Removed old D3 hierarchy functions - using data structure versions instead)

function hierarchyToData(hierarchy) {
    const data = {
        id: hierarchy.data.id,
        name: hierarchy.data.name,
        role: hierarchy.data.role,
        contact: hierarchy.data.contact,
        dept: hierarchy.data.dept
    };
    
    // Preserve _children if they exist (collapsed state)
    if (hierarchy._children && hierarchy._children.length > 0) {
        data._children = hierarchy._children.map(hierarchyToData);
    }
    
    // Include visible children
    if (hierarchy.children && hierarchy.children.length > 0) {
        data.children = hierarchy.children.map(hierarchyToData);
    }
    
    return data;
}

function showTooltip(event, d) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
        <strong>${d.data.name}</strong><br>
        ${d.data.role}<br>
        ${d.data.contact || 'No contact'}
    `;
    tooltip.style.left = (event.pageX + 10) + 'px';
    tooltip.style.top = (event.pageY - 10) + 'px';
    tooltip.style.opacity = 1;
}

function hideTooltip() {
    document.getElementById('tooltip').style.opacity = 0;
}

// Zoom functions
function zoomIn() {
    svg.transition().call(zoom.scaleBy, 1.3);
}

function zoomOut() {
    svg.transition().call(zoom.scaleBy, 0.7);
}

function resetZoom() {
    const useVertical = root ? isHODOnlyMode(root) : true;
    if (useVertical) {
        svg.transition().call(zoom.transform, d3.zoomIdentity.translate(width/2 - nodeWidth/2, 50).scale(0.9));
    } else {
        svg.transition().call(zoom.transform, d3.zoomIdentity.translate(100, height/2).scale(0.7));
    }
}

// Edit Mode
function toggleEditMode() {
    editMode = !editMode;
    const btn = document.getElementById('btn-edit-mode');
    const indicator = document.getElementById('mode-indicator');
    
    if (editMode) {
        btn.innerHTML = '<span>👁️</span> View Mode';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        indicator.classList.add('active');
        document.body.style.cursor = 'crosshair';
    } else {
        btn.innerHTML = '<span>✏️</span> Edit Mode';
        btn.classList.add('btn-secondary');
        btn.classList.remove('btn-primary');
        indicator.classList.remove('active');
        document.body.style.cursor = 'default';
    }
}

// Modal functions
function openEditModal(data) {
    document.getElementById('edit-name').value = data.name;
    document.getElementById('edit-role').value = data.role;
    document.getElementById('edit-contact').value = data.contact || '';
    document.getElementById('edit-dept').value = data.dept || 'ceo';
    
    // Find and set parent
    const parentSelect = document.getElementById('edit-parent');
    parentSelect.value = findParentId(data.id) || '';
    
    document.getElementById('edit-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('edit-modal').classList.remove('active');
    selectedNode = null;
}

function showAddModal() {
    document.getElementById('add-name').value = '';
    document.getElementById('add-role').value = '';
    document.getElementById('add-contact').value = '';
    document.getElementById('add-dept').value = 'admin';
    document.getElementById('add-parent').value = '';
    document.getElementById('add-modal').classList.add('active');
}

function closeAddModal() {
    document.getElementById('add-modal').classList.remove('active');
}

function saveNode() {
    if (!selectedNode) return;
    
    // Save current state before making changes
    saveToHistory();
    
    const newParentId = document.getElementById('edit-parent').value;
    const currentParentId = findParentId(selectedNode.data.id);
    
    // Update node data
    selectedNode.data.name = document.getElementById('edit-name').value;
    selectedNode.data.role = document.getElementById('edit-role').value;
    selectedNode.data.contact = document.getElementById('edit-contact').value;
    selectedNode.data.dept = document.getElementById('edit-dept').value;
    
    // Handle parent change
    if (newParentId !== currentParentId) {
        moveNode(selectedNode.data.id, newParentId);
        return;
    }
    
    // Refresh
    const newData = hierarchyToData(root);
    update(newData);
    closeModal();
    updateUndoRedoButtons();
}

function addNode() {
    const name = document.getElementById('add-name').value;
    const role = document.getElementById('add-role').value;
    
    if (!name || !role) {
        alert('Please enter name and role');
        return;
    }
    
    // Save current state before making changes
    saveToHistory();
    
    const newNode = {
        id: 'new_' + (++nodeIdCounter),
        name: name,
        role: role,
        contact: document.getElementById('add-contact').value,
        dept: document.getElementById('add-dept').value,
        children: []
    };
    
    const parentId = document.getElementById('add-parent').value;
    
    if (parentId) {
        const parent = findNode(currentData, parentId);
        if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(newNode);
        }
    } else {
        // Add as top level (make a new root with both)
        const newRoot = {
            id: 'root_' + (++nodeIdCounter),
            name: "Company",
            role: "Organisation",
            dept: "ceo",
            children: [currentData, newNode]
        };
        currentData = newRoot;
    }
    
    update(currentData);
    populateParentSelects();
    closeAddModal();
    updateUndoRedoButtons();
}

function deleteNode() {
    if (!selectedNode) return;
    if (selectedNode.data.id === 'ceo') {
        alert('Cannot delete CEO!');
        return;
    }
    
    if (confirm('Are you sure you want to delete ' + selectedNode.data.name + '?')) {
        // Save current state before making changes
        saveToHistory();
        
        deleteNodeById(currentData, selectedNode.data.id);
        update(currentData);
        populateParentSelects();
        closeModal();
        updateUndoRedoButtons();
    }
}

function findNode(data, id) {
    if (data.id === id) return data;
    if (data.children) {
        for (let child of data.children) {
            const found = findNode(child, id);
            if (found) return found;
        }
    }
    return null;
}

function findParentId(childId, data = currentData, parentId = null) {
    if (data.id === childId) return parentId;
    if (data.children) {
        for (let child of data.children) {
            const found = findParentId(childId, child, data.id);
            if (found) return found;
        }
    }
    return null;
}

function deleteNodeById(data, id) {
    if (data.children) {
        const idx = data.children.findIndex(c => c.id === id);
        if (idx >= 0) {
            data.children.splice(idx, 1);
            return true;
        }
        for (let child of data.children) {
            if (deleteNodeById(child, id)) return true;
        }
    }
    return false;
}

function moveNode(nodeId, newParentId) {
    // Save current state before making changes
    saveToHistory();
    
    // Find and remove node from current position
    let nodeToMove = null;
    
    function extractNode(data, id) {
        if (data.children) {
            const idx = data.children.findIndex(c => c.id === id);
            if (idx >= 0) {
                nodeToMove = data.children[idx];
                data.children.splice(idx, 1);
                return true;
            }
            for (let child of data.children) {
                if (extractNode(child, id)) return true;
            }
        }
        return false;
    }
    
    extractNode(currentData, nodeId);
    
    if (nodeToMove) {
        if (newParentId) {
            const newParent = findNode(currentData, newParentId);
            if (newParent) {
                if (!newParent.children) newParent.children = [];
                newParent.children.push(nodeToMove);
            }
        } else {
            // Make it a new root alongside current
            const newRoot = {
                id: 'root_' + (++nodeIdCounter),
                name: "Company",
                role: "Organisation",
                dept: "ceo",
                children: [currentData, nodeToMove]
            };
            currentData = newRoot;
        }
    }
    
    update(currentData);
    populateParentSelects();
    closeModal();
    updateUndoRedoButtons();
}

function populateParentSelects() {
    const editSelect = document.getElementById('edit-parent');
    const addSelect = document.getElementById('add-parent');
    
    // Keep first option
    editSelect.innerHTML = '<option value="">-- No Manager (Top Level) --</option>';
    addSelect.innerHTML = '<option value="">-- No Manager (Top Level) --</option>';
    
    // Add all nodes - including collapsed ones (_children)
    function addOptions(data, prefix = '') {
        const option1 = document.createElement('option');
        option1.value = data.id;
        option1.textContent = prefix + data.name + ' (' + data.role + ')';
        editSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = data.id;
        option2.textContent = prefix + data.name + ' (' + data.role + ')';
        addSelect.appendChild(option2);
        
        // Check both children and _children (collapsed)
        const children = data.children || data._children;
        if (children) {
            children.forEach(child => addOptions(child, prefix + '  '));
        }
    }
    
    addOptions(currentData);
}

function exportData() {
    const dataStr = JSON.stringify(currentData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organisation-chart.json';
    a.click();
    URL.revokeObjectURL(url);
}

// History management functions
function saveToHistory() {
    if (isUndoing) return; // Don't save when we're undoing
    
    // Save a deep copy of current data
    historyStack.push(JSON.stringify(currentData));
    
    // Keep only MAX_HISTORY items
    if (historyStack.length > MAX_HISTORY) {
        historyStack.shift();
    }
    
    // Clear redo stack when a new action is performed
    redoStack = [];
}

function undo() {
    if (historyStack.length === 0) return;
    
    isUndoing = true;
    
    // Save current state to redo stack
    redoStack.push(JSON.stringify(currentData));
    
    // Restore previous state
    const previousState = historyStack.pop();
    currentData = JSON.parse(previousState);
    
    // Refresh the chart
    update(currentData);
    populateParentSelects();
    updateUndoRedoButtons();
    
    isUndoing = false;
}

function redo() {
    if (redoStack.length === 0) return;
    
    // Save current state back to history
    historyStack.push(JSON.stringify(currentData));
    
    // Restore from redo stack
    const nextState = redoStack.pop();
    currentData = JSON.parse(nextState);
    
    // Refresh the chart
    update(currentData);
    populateParentSelects();
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('btn-undo');
    const redoBtn = document.getElementById('btn-redo');
    
    if (undoBtn) {
        undoBtn.disabled = historyStack.length === 0;
        undoBtn.style.opacity = historyStack.length === 0 ? '0.5' : '1';
    }
    if (redoBtn) {
        redoBtn.disabled = redoStack.length === 0;
        redoBtn.style.opacity = redoStack.length === 0 ? '0.5' : '1';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+Z or Cmd+Z for undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }
    // Ctrl+Shift+Z or Cmd+Shift+Z for redo
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        redo();
    }
    // Ctrl+Y or Cmd+Y for redo (alternative)
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
    }
});

// Expand/Collapse control functions
function showOnlyHODs() {
    saveToHistory();
    // Work on the data structure, not the D3 hierarchy
    const rootHierarchy = d3.hierarchy(currentData);
    collapseToHODsData(currentData);
    update(currentData);
    updateUndoRedoButtons();
}

function expandAllNodes() {
    saveToHistory();
    expandAllData(currentData);
    update(currentData);
    updateUndoRedoButtons();
}

function collapseAllNodes() {
    saveToHistory();
    collapseAllData(currentData);
    update(currentData);
    updateUndoRedoButtons();
}

// Show HODs only - same as collapse all
function collapseToHODsData(data) {
    // Use the same logic as collapseAllData
    collapseAllData(data);
}

function expandAllData(data) {
    if (data._children) {
        data.children = data._children;
        data._children = null;
    }
    if (data.children) {
        data.children.forEach(expandAllData);
    }
}

function collapseAllData(data) {
    // First, expand everything so we can properly traverse
    function expandEverything(node) {
        if (node._children) {
            if (!node.children) node.children = [];
            node.children = node.children.concat(node._children);
            node._children = null;
        }
        if (node.children) {
            node.children.forEach(expandEverything);
        }
    }
    
    // Expand all first
    expandEverything(data);
    
    // Now collapse non-HODs
    function collapseNonHODs(node) {
        if (!node.children) return;
        
        // Process children first (bottom-up)
        node.children.forEach(collapseNonHODs);
        
        // Separate HODs from non-HODs
        const hodChildren = [];
        const nonHodChildren = [];
        
        node.children.forEach(child => {
            if (isHODNode(child)) {
                hodChildren.push(child);
            } else {
                nonHodChildren.push(child);
            }
        });
        
        // Keep only HODs visible
        node.children = hodChildren.length > 0 ? hodChildren : null;
        if (nonHodChildren.length > 0) {
            node._children = nonHodChildren;
        } else {
            node._children = null;
        }
    }
    
    collapseNonHODs(data);
}

// Initial zoom to fit
setTimeout(() => {
    // Collapse to show only CEO, GMs, and HODs by default (vertical layout)
    collapseToHODsData(currentData);
    update(currentData);
    // Center vertically for initial view
    svg.transition().call(zoom.transform, d3.zoomIdentity.translate(width/2 - nodeWidth/2, 50).scale(0.9));
}, 100);
