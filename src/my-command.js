import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  const doc = sketch.getSelectedDocument()
  const selectedLayers = doc.selectedLayers

  var check = checkLayers(selectedLayers)
  if (check == 0) {
    // Turn all selected layers hidden
    selectedLayers.forEach(function(layer) {
        layer.hidden = 1
    })
  } else if (check == 1) {
    // Turn all selected layers visible
    selectedLayers.forEach(function(layer) {
        layer.hidden = 0
    })
  } else if (check == 2) {
    sketch.UI.message("No selected layers. Please Select a layer.")
  }

}

function checkLayers(selectedLayers) {
    var isVisibleCount = []
    var isHiddenCount = []
    selectedLayers.forEach(function(layer) {
        if (layer.hidden == 1) {
            isHiddenCount.push(true)
        } else {
            isVisibleCount.push(false)
        }
    })
    if ((isVisibleCount.length == 0) && (isHiddenCount.length > 0)) {
        return 1 //All Hidden
    } else if ((isVisibleCount.length > 0) && (isHiddenCount.length == 0)) {
        return 0 //All Visible or at least one visible
    } else if (selectedLayers.length == 0) {
        return 2 //No layers selected
    } else {
        return 0 //At least one layer is visible
    }
}
