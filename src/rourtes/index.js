import routesConfig from '~/config/routes'

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
  {path: routesConfig.home, component: Home},
  {path: routesConfig.following, component: Following},
  {path: routesConfig.profile, component: Profile},
  {path:routesConfig.search, component: Search, layout: null},
  {path:routesConfig.upload, component: Upload, layout: HeaderOnly},
]


// những router sau này sử dụng cho các trang cần đăng nhập mới vào được
const privateRoutes=[
     
]

export {publicRoutes ,privateRoutes}