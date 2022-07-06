const stateForm = document.querySelector('#select-state-form')
const filterForm = document.querySelector('#filter-by-type')
const breweryList =  document.querySelector('#breweries-list')
const breweryListH1 = document.querySelector('h1')
const apiURL = "https://api.openbrewerydb.org/breweries"

const state = {
    types: ["micro", "regional", "brewpub"],
    usState: '',
    breweries: [],
    microBreweries: [],
    regionalBreweries: [],
    brewpubBreweries: []
}

// EVENT LISTENERS
stateForm.addEventListener("submit", (event) => {

    event.preventDefault()
    breweryList.innerHTML = ''
    breweryListH1.innerText = "List of Breweries"

    const searchEntry = event.target[0].value
    breweryListH1.innerText += " (" + searchEntry + ")"
    state.usState = searchEntry
    console.log("search entry is ", searchEntry)

    fetch(apiURL + "?by_state=" + searchEntry + "&per_page=50")

        .then(function (resp) {
            console.log("my response", resp);
            return resp.json();
        })
    
        .then(function (data) {
            console.log("data", data);

            const breweriesFilteredByType = []

            state.types.forEach((type) => {
                let filteredBreweries = data.filter((element) => element.brewery_type === type)

                filteredBreweries.forEach((brewery) => {
                    breweriesFilteredByType.push(brewery)
                })

                
                console.log("filtered breweries ", breweriesFilteredByType)
            })
            
            state.breweries = breweriesFilteredByType

            renderBreweries()
        })
    
    console.log("state is ", state)

    stateForm.reset()
})

filterForm.addEventListener("change", (event) => {
    console.log("event is ", event, "event target value is ", event.target.value)

    switch(event.target.value) {
        case "Micro":
          filterMicroBreweries()
          break;
        case "Regional":
          filterRegionalBreweries()
          break;
        case "Brewpub":
          filterBrewpubBreweries()
      }

      console.log(state.microBreweries, state.regionalBreweries, state.brewpubBreweries)
})

// RENDER FUNCTIONS
const render = (filteredBreweryArray) => {

    filteredBreweryArray.forEach((brewery) => {
        let breweryLi = document.createElement('li')

        let breweryName = document.createElement('h2')
        breweryName.innerText = brewery.name

        let breweryType = document.createElement('div')
        breweryType.className = "type"
        breweryType.innerText = brewery.brewery_type

        let addressSection = document.createElement('section')
        addressSection.className = "address"

        let addressHeader = document.createElement('h3')
        addressHeader.innerText = "Address:"

        let addressStreet = document.createElement('p')
        addressStreet.innerText = brewery.street

        let addressCityAndPost = document.createElement('p')
        let strongAddressCityAndPost = document.createElement('strong')
        strongAddressCityAndPost.innerText = brewery.city + ", " + brewery.postal_code

        let phoneSection = document.createElement('section')
        phoneSection.className = "phone"

        let phoneHeader = document.createElement('h3')
        phoneHeader.innerText = "Phone:"

        let PhoneNumber = document.createElement('p')
        PhoneNumber.innerText = brewery.phone

        let linkSection = document.createElement('section')
        linkSection.className = "link"

        let brewerySiteLink = document.createElement('a')
        brewerySiteLink.href = brewery.website_url
        brewerySiteLink.target = "_blank"
        brewerySiteLink.innerText = "Visit Website"

        linkSection.append(brewerySiteLink)
        phoneSection.append(phoneHeader, PhoneNumber)
        addressCityAndPost.append(strongAddressCityAndPost)
        addressSection.append(addressHeader, addressStreet, addressCityAndPost)
        breweryLi.append(breweryName, breweryType, addressSection, phoneSection, linkSection)
        breweryList.append(breweryLi)
    })
}

const renderBreweries = () => {

    render(state.breweries)
}

const renderMicroBreweries = () => {

    render(state.microBreweries)
}

const renderRegionalBreweries = () => {

    render(state.RegionalBreweries)
}

const renderBrewpubBreweries = () => {

    render(state.BrewpubBreweries)
}

// BREWERY FILTERS
const filter = (filterType, filterBy, filteredBreweryArray) => {

    filteredBreweryArray = state.breweries.filter((brewery) => filterType === filterBy)
}

const filterMicroBreweries = () => {

    filter(brewery.brewery_type, "Micro", state.microBreweries)
}

const filterRegionalBreweries = () => {

    filter(brewery.brewery_type, "Regional", state.regionalBreweries)
}

const filterBrewpubBreweries = () => {

    filter(brewery.brewery_type, "Brewpub", state.brewpubBreweries)
}


console.log("state is ", state)



// filterForm.addEventListener("change", (event) => {
//     console.log("event is ", event, "event target value is ", event.target.value)

//     filter${event.target.value}Breweries()
// })

// const filter = (filterType, filterBy, filteredBreweryArray) => {

//     filteredBreweryArray = state.breweries.filter((brewery) => filterType === filterBy)
// }

// const filterMicroBreweries = () => {

//     filter(brewery.brewery_type, "micro", state.microBreweries)
// }



// let state = {
//     ...,
//     breweryTypeFilters: ['micro', etc...]
//   }
  
//   // event listener to detect a check box change for type filter
//   checkbox.addEventListener(... {
//     if(checkbox is checked) // push this checkbox brewery type to breweryTypeFilters
//     else // remove brewery type from brewery type filters
//     // call
//     renderBreweries(filteredBreweries())
//   })
  
//   function filteredBreweries() {
//     const filtered = state.breweries.filter(..., {
//       return true if brewery matches any of the state.breweryTypeFilters
//     }) 
//     return filtered
//   }
  
//   renderBreweries(breweriesToRender) {
//     // clear list
//     // for each brewery to render -> render brewery
//   }