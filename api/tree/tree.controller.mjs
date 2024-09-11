// controllers/treeController.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../../models/TreeData.json');

let treeData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

function saveTreeData() {
    fs.writeFileSync(dataFilePath, JSON.stringify(treeData, null, 2));
}

function findNodeById(tree, id) {
    if (!tree || tree.length === 0) return null;
    for (let node of tree) {
        if (node[id]) return node[id];
        const found = findNodeById(node[Object.keys(node)[0]].children, id);
        if (found) return found;
    }
    return null;
}

function generateNewId(tree) {
    let maxId = 0;
    function traverse(tree) {
        for (let node of tree) {
            const id = parseInt(Object.keys(node)[0]);
            if (id > maxId) maxId = id;
            traverse(node[Object.keys(node)[0]].children);
        }
    }
    traverse(tree);
    return maxId + 1;
}

export function getTree (req, res) {
    res.json(treeData);
};

export function addNode (req, res) {
    const { parent, label } = req.body;
    if (!parent || !label) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }
    const parentNode = findNodeById(treeData, parent);
    if (!parentNode) {
        return res.status(404).json({ error: 'Parent node not found' });
    }
    const newId = generateNewId(treeData);
    const newNode = { [newId]: { label: label, children: [] } };
    parentNode.children.push(newNode);
    saveTreeData();
    res.status(201).json(newNode);
};
