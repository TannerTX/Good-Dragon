import React from "react"

var Funcs =  {

    PHL: function(a, b) {

    if(a.itemPrice > b.itemPrice)
    return -1

    else if(a.itemPrice < b.itemPrice)
    return 1
    
    return 0
},

    PLH: function(a, b){

    if(a.itemPrice > b.itemPrice)
    return 1

    else if(a.itemPrice < b.itemPrice)
    return -1
    
    return 0

},

    AHL: function(a, b){

    if(a.availableQuantity > b.availableQuantity)
    return -1

    else if(a.availableQuantity < b.availableQuantity)
    return 1
    
    return 0
},

    ALH: function(a, b){

    if(a.availableQuantity > b.availableQuantity)
    return 1

    else if(a.availableQuantity < b.availableQuantity)
    return -1
    
    return 0
}

}

export default Funcs