const stateForm = document.querySelector('#select-state-form')
const breweryList =  document.querySelector('#breweries-list')
const apiURL = "https://api.openbrewerydb.org/breweries"

const state = {
    types: ["micro", "regional", "brewpub"],
    usState: '',
    breweries: []
}

stateForm.addEventListener("submit", (event) => {

    event.preventDefault()
    const searchEntry = event.target[0].value
    state.usState = searchEntry
    console.log("search entry is ", searchEntry)

    fetch(apiURL + "?by_state=" + searchEntry)

    .then(function (resp) {
        console.log("my response", resp);
        return resp.json();
    })
  
    .then(function (data) {
        console.log("data", data);

        const breweriesFilteredByType = data.filter((element) => element.brewery_type === state.types[0] ||
                                                                element.brewery_type === state.types[1] ||
                                                                element.brewery_type === state.types[2]
        )
        
        state.breweries = breweriesFilteredByType
    })

    .then(render())
    
    console.log("state is ", state)

    stateForm.reset()
})

const render = () => {

    state.breweries.forEach((brewery) => {
        let breweryLi = document.createElement('li')

        breweryLi.innerHTML = '<h2>`${breweries.name}`</h2>'

        breweryList.append(breweryLi)
    })

}

console.log("state is ", state)














// liEle.innerHTML = "

//   <h2>`${breweries.name}`</h2>
//   <div class="type">`${breweries.brewery_type}`</div>
//   <section class="address">
//     <h3>Address:</h3>
//     <p>`${breweries.street}`</p>
//     <p><strong>`${breweries.city}`, `${breweries.postal_code}`</strong></p>
//   </section>
//   <section class="phone">
//     <h3>Phone:</h3>
//     <p>`${breweries.phone}`</p>
//   </section>
//   <section class="link">
//     <a href=`${breweries.website_url}` target="_blank">Visit Website</a>
//   </section>

// "