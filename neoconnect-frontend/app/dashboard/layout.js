import Navbar from "../../components/navbar";

export default function DashboardLayout({ children }) {

 return (

  <div>

   <Navbar />

   <div>
    {children}
   </div>

  </div>

 );

}