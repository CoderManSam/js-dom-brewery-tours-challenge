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
            })
            
            state.breweries = breweriesFilteredByType

            renderBreweries()
        })

    stateForm.reset()
})

filterForm.addEventListener("change", (event) => {

    selectBreweryFilterAndRender(event.target.value)
})


// RENDER FUNCTIONS
const render = (filteredBreweryArray) => {

    breweryList.innerHTML = ''

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

    breweryListH1.innerText = "List of Breweries" + " (" + state.usState + " - Micro Breweries)"
}

const renderRegionalBreweries = () => {

    render(state.regionalBreweries)

    breweryListH1.innerText = "List of Breweries" + " (" + state.usState + " - Regional Breweries)"
}

const renderBrewpubBreweries = () => {

    render(state.brewpubBreweries)

    breweryListH1.innerText = "List of Breweries" + " (" + state.usState + " - Brewpub Breweries)"
}


// BREWERY FILTERS
const filter = (filterBy, filteredBreweryArray) => {

    let filteredArray = state.breweries.filter((brewery) => brewery.brewery_type === filterBy)

    filteredArray.forEach((brewery) => {
        filteredBreweryArray.push(brewery)
    })
}

const filterMicroBreweries = () => {

    filter("micro", state.microBreweries)
}

const filterRegionalBreweries = () => {

    filter("regional", state.regionalBreweries)
}

const filterBrewpubBreweries = () => {

    filter("brewpub", state.brewpubBreweries)
}


const selectBreweryFilterAndRender = (breweryType) => {

    console.log("brewery type is ", breweryType)

    if(breweryType === "micro") {

        filterMicroBreweries()

        renderMicroBreweries()
    }

    if(breweryType === "regional") {

        filterRegionalBreweries()

        renderRegionalBreweries()
    }

    if(breweryType === "brewpub") {

        filterBrewpubBreweries()

        renderBrewpubBreweries()
    }

    else console.log("error brewery type cannot be found for filter and render function")
}


console.log("state is ", state)


// MY INITIAL IDEA FOR THE FILTER BY DROPDOWN THAT WASNT FEASIBLE
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


// TEACHER PROVIDED EXAMPLE OF DIRECTION COULD TAKE WITH FILTER BY DROPDOWN
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