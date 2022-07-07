const stateForm = document.querySelector('#select-state-form')
const filterForm = document.querySelector('#filter-by-type')
const addTypeForm = document.querySelector('#add-type-form')
const breweryList =  document.querySelector('#breweries-list')
const breweryListH1 = document.querySelector('h1')
const apiURL = "https://api.openbrewerydb.org/breweries"

const state = {
    types: ["micro", "regional", "brewpub"],
    usState: '',
    breweries: [],
    filteredBreweries: []
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

    filter(event.target.value)

    renderFilteredBreweries()

    breweryListH1.innerText = "List of Breweries" + " (" + state.usState + " - " + `${event.target.value}` + " breweries)"
})

addTypeForm.addEventListener("submit", (event) => {

    event.preventDefault()
    breweryList.innerHTML = ''
    breweryListH1.innerText = "List of Breweries"

    const addTypeEntry = event.target[0].value

    state.types.push(addTypeEntry)

    const newTypeOfBreweryFilter = document.createElement('option')
    newTypeOfBreweryFilter.value = `${event.target[0].value}`
    newTypeOfBreweryFilter.innerText = `${event.target[0].value}`

    filterForm.append(newTypeOfBreweryFilter)

    addTypeForm.reset()
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

const renderFilteredBreweries = () => {

    render(state.filteredBreweries)
}


// BREWERY FILTERS
const filter = (filterBy) => {

    state.filteredBreweries = state.breweries.filter((brewery) => brewery.brewery_type === filterBy)
}


console.log("state is ", state)