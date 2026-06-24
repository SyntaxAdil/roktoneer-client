import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/navbar/Navbar";




export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen flex flex-col font-sans ">
      <Navbar></Navbar>
      <main className="  flex-1">{children}</main>
      
      <Footer></Footer>
    </section>
  );
}
