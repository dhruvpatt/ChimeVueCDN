Vue.component('info-text', {

    props: ['item', 'attr'],

    template: `
        <div>
            <p class='info-item-attribute'> {{ attr.toUpperCase() }} </p>
            <p class='info-item-value'> {{ item.toString().toUpperCase() }}</p>
        </div>
    `

})