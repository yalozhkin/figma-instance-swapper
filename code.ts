// This script runs in the Figma environment

function swapInstances(): void {
  // Check if there are at least two nodes selected
  if (figma.currentPage.selection.length < 2) {
    figma.closePlugin('✋ Select two or more instances. The latest selected will replace the others.');
    return;
  }

  let targetInstance: InstanceNode | null = null;
  const swapInstances: InstanceNode[] = [];

  // Identify the target instance and collect all swap instances
  for (const node of figma.currentPage.selection) {
    if (node.type === 'INSTANCE' && (!node.parent || node.parent.type !== 'INSTANCE')) {
      targetInstance = node as InstanceNode;
    } else if (node.type === 'INSTANCE') {
      swapInstances.push(node as InstanceNode);
    }
  }

  // Check if a target instance was identified and there's at least one swap instance
  if (!targetInstance || swapInstances.length === 0) {
    figma.closePlugin('✋ Select two or more instances. The latest selected will replace the others.');
    return;
  }

  // Swap the components of the swap instances with the target instance's component
  for (const swapInstance of swapInstances) {
    if (targetInstance.mainComponent) {
      swapInstance.swapComponent(targetInstance.mainComponent as ComponentNode);
    }
  }
}

// Execute the function
swapInstances();