// This script runs in the Figma environment

function swapInstances(): void {
  // Check if there are at least two nodes selected
  if (figma.currentPage.selection.length < 2) {
    figma.closePlugin('Please select at least one nested instance and one content instance.');
    return;
  }

  let contentInstance: InstanceNode | null = null;
  const nestedInstances: InstanceNode[] = [];

  // Identify the content instance and collect all nested instances
  for (const node of figma.currentPage.selection) {
    if (node.type === 'INSTANCE' && (!node.parent || node.parent.type !== 'INSTANCE')) {
      contentInstance = node;
    } else if (node.type === 'INSTANCE') {
      nestedInstances.push(node);
    }
  }

  // Check if a content instance was identified and there's at least one nested instance
  if (!contentInstance || nestedInstances.length === 0) {
    figma.closePlugin('Please select at least one nested instance and one content instance.');
    return;
  }

  // Check if the content instance has a main component
  if (!contentInstance.mainComponent) {
    figma.closePlugin('The content instance must have a main component.');
    return;
  }

  // Swap the components of the nested instances with the content instance's component
  for (const nestedInstance of nestedInstances) {
    nestedInstance.swapComponent(contentInstance.mainComponent);
  }

  figma.closePlugin('Instances swapped successfully.');
}

// Execute the function
swapInstances();