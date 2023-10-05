import React, { useState } from 'react';
import { TreeNodeProps } from './treeNode.props';
import { useTheme } from '../../hooks/useTheme';
import styles from './treeNode.module.css';
const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  addNodeToId,
  deleteNodeById,
}) => {
  const { theme } = useTheme();
  const isThemeLight = theme === 'light';

  const [newNodeName, setNewNodeName] = useState('');
  const [isAddingNode, setIsAddingNode] = useState(false);

  const handleAddNode = (): void => {
    if (newNodeName.trim() !== '') {
      addNodeToId(node.id, newNodeName);
      setNewNodeName('');
      setIsAddingNode(false);
    }
  };

  const handleDeleteNode = (): void => {
    deleteNodeById(node.id);
  };

  const handleAddNewNode = (): void => {
    setIsAddingNode(true);
  };

  return (
    <li>
      <div>
        <span className={styles.text}>{node.name}</span>
        <br />
        <button onClick={handleAddNewNode} className={styles.button}>
          <img
            src={isThemeLight ? '/plus.svg' : '/plus-light.svg'}
            alt='Button image'
            className={styles.image}
          />
        </button>
        <button onClick={handleDeleteNode} className={styles.button}>
          <img
            src={isThemeLight ? '/delete.svg' : '/delete-light.svg'}
            alt='Button image'
            className={styles.image}
          />
        </button>{' '}
      </div>
      {isAddingNode && (
        <ul>
          <li>
            <div className={styles.form}>
              <input
                type='text'
                placeholder='Name new node'
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
              />
              <button onClick={handleAddNode} className={styles.button}>
                <img
                  src={isThemeLight ? '/plus.svg' : '/plus-light.svg'}
                  alt='Button image'
                  className={styles.image}
                />
              </button>
            </div>
          </li>
        </ul>
      )}
      {node.children.length > 0 && (
        <ul>
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              addNodeToId={addNodeToId}
              deleteNodeById={deleteNodeById}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
