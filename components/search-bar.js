
Vue.component('search-bar', {
    data: function(){
        return {
            searchToggled: false,
            query: '',
            results: []
        }
    },

    template: `
    <div class="search-box">
        <div class="search-cont">
            <button class="search-button" v-on:click='closeSearch'><img src="./assets/search-icon-2048x2048-cmujl7en.png" alt="search-img" id="search-img"></button>
            <input type="text" placeholder="Search" id="search-input" v-on:focus='searchFocus' v-on:keyup='handleSearch' v-model='query'>
        </div>
        <div class="search-results-cont">
            <p class='results-str' v-if="results.length > 0">Results</p>
            <hr class='hr-results' v-if="results.length > 0">
            <ul id="search-results">  
                <search-result v-for="(result, index) in results" v-bind:key="index" v-bind:result="result"></search-result>
            </ul>
        </div>
    </div>
    `,

    methods: {
        searchFocus() {
            const input = document.getElementById("search-input");
            const upperDiv = document.getElementsByClassName("upper-box")[0];
            const searchDiv = document.getElementsByClassName('search-box')[0];
            const searchImg = document.getElementById("search-img");
            
            if (!this.searchToggled){
                upperDiv.style.transition = 'height 0.3s ease';
                this.searchToggled = true;
                upperDiv.style.height = '2.75rem';
                searchDiv.style.margin='1.25rem 1.25rem 0';
                searchDiv.style.padding = '0.75rem 16.813rem 0.75rem 0.875rem';
                input.style.width = '18em';
                searchImg.src = 'assets/cross-23.png';
                
            }
        },
        
        closeSearch() {
            const input = document.getElementById("search-input");
            const searchButton = document.getElementsByClassName('search-button')[0];
            const upperDiv = document.getElementsByClassName("upper-box")[0];
            const searchDiv = document.getElementsByClassName('search-box')[0];
            const searchImg = document.getElementById("search-img");

            if (this.searchToggled){
                this.searchToggled = false;
                upperDiv.style.transition = 'height 0.3s ease';
                upperDiv.style.height = '20rem'
                searchDiv.style.margin = '18.5rem 11.75rem 0 1.25rem';
                searchDiv.style.padding = '0.75rem 3.125rem 0.75rem 0.875rem';
                input.style.width = '5rem';
                searchImg.src = 'assets/search-icon-2048x2048-cmujl7en.png'
            }
            this.results = [];
            this.query = '';
            input.value = '';
        },

        handleSearch(){
            var query = this.query;
            const searchResult = document.getElementById("search-results");
            searchResult.innerHTML = ''; // Clear previous search results
            if (query.trim() === '') {
                // If search query is empty, do not display anything
                return;
            }
            const filteredData = data.filter(item => {
                // since the type of the data determines what we search by, we handle each case separately
                if (item.type == 'person'){
                    var val = item.firstname.toLowerCase().includes(query.toLowerCase()) || item.lastname.toLowerCase().includes(query.toLowerCase());
                    return val;
                }
                else if (item.type == 'place'){
                    return item.name.toLowerCase().includes(query.toLowerCase());
                }
                else if (item.type == 'quote'){
                    return item.description.toLowerCase().includes(query.toLowerCase());
                }
                else{
                    return false;
                }
            });
            // if we have no results then return null
            if (filteredData.length == 0){
                return;
            }

            filteredData.forEach((element) => {
                this.results.push({item: element, match: query, type: element.type})
            })
            

        },

        showHr(){
            return this.results != [];
        }


    }
})