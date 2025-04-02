import "./App.css";
import {apiUrl, filterData} from "./data";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import {toast} from "react-toastify"
import {useEffect} from 'react';
import {useState} from 'react';
import Spinner from "./components/Spinner";

const App=() =>{

  const [courses,setCourses]=useState(null);
  const [Loading, setLoading]=useState(true);
  const [category, setCategory]=useState(filterData[0].title)

  
   async function fetchData(){
    setLoading(true);
    try{
      const res=await fetch(apiUrl);
      const output=await res.json();
      // console.log(output);
      setCourses(output.data);
      
    }catch(error){
      toast.error("Something went wrong");
    }
    setLoading(false);
   }

  useEffect( ()=>{
   fetchData();
  },[]);

  
  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">

      <div>
      <Navbar/>
      </div>

    <div className="bg-bgDark2">
    <div>
      <Filter
      filterData={filterData}
      category={category}
      setCategory={setCategory}
      />
      </div>

      <div className="w-11/12 flex flex-wrap max-w-[1200px] items-center min-h-[50vh] mx-auto  justify-center">
        {
          Loading ? (<Spinner/>) :(<Cards courses={courses} category={category} />)
        }
      
       </div>
    </div>
       
    </div>
  );
}

export default App;
