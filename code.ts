// This script runs in the Figma environment

function swapInstances(): void {
  // Check if there are exactly two nodes selected
  if (figma.currentPage.selection.length !== 2) {
    figma.closePlugin('Please select exactly two instances.');
    return;
  }

  const [firstInstance, secondInstance] = figma.currentPage.selection as [InstanceNode, InstanceNode];

  // Check if both selected nodes are instances
  if (firstInstance.type !== 'INSTANCE' || secondInstance.type !== 'INSTANCE') {
    figma.closePlugin('Both selected nodes must be instances.');
    return;
  }

  // Check if both instances have main components
  if (!firstInstance.mainComponent || !secondInstance.mainComponent) {
    figma.closePlugin('Both instances must have main components.');
    return;
  }

  // Swap the components of the two instances
  const firstMainComponent = firstInstance.mainComponent;
  firstInstance.swapComponent(secondInstance.mainComponent);
  secondInstance.swapComponent(firstMainComponent);

  // If one instance is nested and the other is free, move the free instance to the position of the nested instance
  if (firstInstance.parent && firstInstance.parent.type !== 'INSTANCE' && secondInstance.parent && secondInstance.parent.type === 'INSTANCE') {
    firstInstance.x = secondInstance.x;
    firstInstance.y = secondInstance.y;
  } else if (secondInstance.parent && secondInstance.parent.type !== 'INSTANCE' && firstInstance.parent && firstInstance.parent.type === 'INSTANCE') {
    secondInstance.x = firstInstance.x;
    secondInstance.y = firstInstance.y;
  }

  figma.closePlugin('Instances swapped successfully.');
}

// Execute the function
swapInstances();
