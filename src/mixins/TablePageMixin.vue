<script>
import {defineComponent} from "vue";
export default defineComponent({
  name : "TablePageMixin",
  data() {
    return {
      pageRouting : false,
      pageReady : false,
      axiosSource : null,
    }
  },
  computed : {
    // 기본 값 및 목록 가져오는 함수 필수!
    defaultPagination: () => null,
    fetchApi: () => null,
  },
  created(){
    console.log("PAGE MIXIN CREATE");
    this.initPagination();
  },
  mounted(){
    this.fetchData({pagination : this.pagination});
    window.addEventListener("popstate", this.routeChange);
  },
  beforeUnmount(){
    window.removeEventListener("popstate", this.routeChange);
  },
  methods : {
    routeChange() {
      this.pageRouting = true;
      this.initPagination();
      this.fetchData({pagination: this.pagination});
    },
    initPagination() {
      // URL Routing Query 문자열을 가지고와서 기록
      const {query} = this.$route;
      const pagination = {};
      const options = {...this.defaultPagination, ...this.pagination}

      Object.keys(options).forEach(key => {
        const value = options[key];
        switch(typeof value) {
          case 'Number':
            pagination[key] = query[key] ? Number(query[key]) : value;
            break;
          case "boolean":
            pagination[key] = query[key] ? query[key] == 'true' : value;
            break;
          default:
          pagination[key] = query[key] || value;
        }
        this.pagination = pagination;
      })
    },
    async fetchData({pagination}) {
      try{
        if(this.fetchApi == null) {
          throw new Error('fetchApi 함수를 찾을 수 없습니다.');
        }

        //rowsNumbers는 필요 없음
        delete pagination.rowsNumbers;

        const data = await this.fetchApi(pagination);
        console.log('data : ', data);
        if(data) {
          this.rows = data.rows;
          this.pagination = {
            ...pagination,
            rowsNumber : data.count,
          }
        }

        // Page History
        this.pushState();
        this.pageReady = true;
        this.pageRouting = false;
      } catch(e) {
        console.error(e.message);
      }
    },
    pushState() {
      if(!this.pageRouting) {
        const query = {};
        Object.keys(this.pagination).forEach(key => {
          switch(key) {
            case 'rowsNumber':
              break;
            default:
              query[key] = this.pagination[key] || undefined;
          }
        });
        if(this.pageReady) {
          this.$router.push({path:this.$route.path, query})
        } else {
          this.$router.replace({path: this.$route.path, query})
          this.pageReady = true;
        }
      }
    }
  }
})
</script>
