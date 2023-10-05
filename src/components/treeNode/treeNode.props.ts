import { TreeNode } from '../../global/interfaces';

export interface TreeNodeProps {
  node: TreeNode;
  addNodeToId: (parentId: string, newNodeName: string) => void;
  deleteNodeById: (nodeId: string) => void; // Додайте цей проп
}
