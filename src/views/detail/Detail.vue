<template>
    <div class="detail">
        {{title}}
        {{time}}
        {{category}}
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { mapGetters } from 'vuex';
import { parseTime } from '@/utils';
export default {
    data () {
        return {
            title: '',
            author: 'yuanwill',
            time: '',
            category: ''
        };
    },
    computed: {
        ...mapGetters([
            'categoriesList'
        ])
    },
    methods: {
       async responseAPI () {
           const response = await api.get(config.home.lastestArt + '/' + this.$route.query.id);
           if (Number(response.status) === 200) {
               this.title = response.data.title.rendered;
               this.time = parseTime(response.data.date);
               this.categoriesList.forEach(item => {
                   if (item.id === response.data.categories[0]) {
                       this.category = item.name;
                   } else if (item.children.length) {
                       item.children.forEach(childItem => {
                           if (childItem.id === response.data.categories[0]) {
                               this.category = childItem.name;
                           }
                       });
                   }
               });
           }
       }
    },
    mounted () {
        this.responseAPI();
    },
    watch: {
        '$route' (to, from) {
            this.responseAPI();
        }
    }
};
</script>
