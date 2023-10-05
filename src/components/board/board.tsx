import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { TreeNode } from '../../global/interfaces';
import TreeNodeComp from '../treeNode';

import './board.css';

const Board = (): JSX.Element => {
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: '1',
      name: 'Test',
      children: [],
    },
  ]);

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { zoom } = useTheme();

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  const treeStyles = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    cursor: dragging ? 'grabbing' : 'grab',
    zoom,
  };

  const addNodeToId = (id: string, newNodeName: string) => {
    const updatedTreeData = [...treeData];
    const findAndAddNode = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.id === id) {
          node.children.push({
            id: generateUniqueId(),
            name: newNodeName,
            children: [],
          });
          return true;
        }
        if (node.children.length > 0 && findAndAddNode(node.children)) {
          return true;
        }
      }
      return false;
    };

    findAndAddNode(updatedTreeData);
    setTreeData(updatedTreeData);
  };

  const generateUniqueId = () => {
    return Date.now().toString();
  };
  const deleteNodeById = (id: string) => {
    const updatedTreeData = removeNodeById(treeData, id);
    setTreeData(updatedTreeData);
  };

  const removeNodeById = (nodes: TreeNode[], idToDelete: string) => {
    return nodes.filter((node) => {
      if (node.id === idToDelete) {
        return false;
      }
      node.children = removeNodeById(node.children, idToDelete);
      return true;
    });
  };

  return (
    <div style={treeStyles}>
      <div className='tree' onMouseDown={handleMouseDown}>
        <ul>
          {treeData.map((node) => (
            <TreeNodeComp
              key={node.id}
              node={node}
              addNodeToId={addNodeToId}
              deleteNodeById={deleteNodeById}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;
