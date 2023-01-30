//layouta
import { HeaderOnly } from '~/components/Layout'

//pages
import Home from "~/pages/Home"
import Following from "~/pages/Following"
import Profile from "~/pages/Profile"
import Upload from "~/pages/Upload"
import Search from "~/pages/Search"

//sử dụng cho các trang bình thường
const publicRoutes =[
  {path: '/', component: Home},
  {path:'/following', component: Following},
  {path:'/profile', component: Profile},
  {path:'/search', component: Search, layout: null},
  {path:'/upload', component: Upload, layout: HeaderOnly},
]


// những router sau này sử dụng cho các trang cần đăng nhập mới vào được
const privateRoutes=[
     
]

export {publicRoutes ,privateRoutes}