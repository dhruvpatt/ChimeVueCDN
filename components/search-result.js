


Vue.component('search-result', {
  props: ['result'],
  computed: {
    getIconStyle() {
      return {
        backgroundImage: `url(./assets/${this.result.type}.png)`, // Adjust the path as necessary
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: 'contain'
      };
    },

    getSearchResult(){
        if(this.result.type == 'person'){
            const fullName = `${this.result.item.firstname} ${this.result.item.lastname}`;
            const query = this.result.match;
            var beforeMatch;
            var match;
            var afterMatch;
            const startIndex = fullName.toLowerCase().indexOf(query.toLowerCase())
            var ret;
            if (fullName.length > 20){
                // if the start index is greater than 10, then we can display a truncated name from both sides
                
                if (startIndex > 10){
                    beforeMatch = fullName.substring(startIndex - 10, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                    // span to add the search highlights
                    ret = '...' + beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                } else {
                    beforeMatch = fullName.substring(0, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                    ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                }
                
            }
            else {
                beforeMatch = fullName.substring(0, startIndex)
                match = fullName.substring(startIndex, startIndex + query.length)
                afterMatch = fullName.substring(startIndex + query.length, fullName.length)
                ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch;
            }

            return ret;
        }

        else if (this.result.type == "place"){
            const fullName = `${this.result.item.name}`;
            var beforeMatch;
            var match;
            var afterMatch;
            const query = this.result.match;
            var ret;
            const startIndex = fullName.toLowerCase().indexOf(query.toLowerCase())
            // if the name is too big to display then we need to truncate it.
            if (fullName.length > 20){
                
                // if the start index is greater than 10, then we can display a truncated name from both sides
                
                if (startIndex > 10){
                    beforeMatch = fullName.substring(startIndex - 10, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, startIndex + match.length + 10)
                    ret = '...' + beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                } else {
                    beforeMatch = fullName.substring(0, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                    ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                }
            }

            else{ 
                beforeMatch = fullName.substring(0, startIndex)
                match = fullName.substring(startIndex, startIndex + query.length)
                afterMatch = fullName.substring(startIndex + query.length, fullName.length)
                ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch;
            }
            return ret
        }

        else if (this.result.type == 'quote'){
            const fullName = `${this.result.item.description}`; 
            var query = this.result.match;
            var ret;
            var beforeMatch;
            var match;
            var afterMatch;
            const startIndex = fullName.toLowerCase().indexOf(query.toLowerCase());
            // if the name is too big to display then we need to truncate it.
            if (fullName.length > 20){
                
                // if the start index is greater than 10, then we can display a truncated name from both sides
                ;
                if (startIndex > 10){
                    beforeMatch = fullName.substring(startIndex - 10, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                    ret = '...' + beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                } else {
                    beforeMatch = fullName.substring(0, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                    ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                }
            }
            else {
                beforeMatch = fullName.substring(0, startIndex)
                match = fullName.substring(startIndex, startIndex + query.length)
                afterMatch = fullName.substring(startIndex + query.length, fullName.length)
                ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch;
            }

            return ret;

        }
  },
  },
  template: `
    <li class='search-result' :style="getIconStyle">
      <button class='search-result-btn' v-html="getSearchResult" v-on:click="handleClick"></button>
    </li>
  `,

  methods: {
    handleClick() {
        EventBus.$emit('resultClicked', this.result.item);
    }
  }

});