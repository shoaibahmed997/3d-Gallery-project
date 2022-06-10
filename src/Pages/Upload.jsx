import React, { useRef } from 'react'
import { useQueryClient ,useQuery} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'



const fetchUserData = async()=>{
    let token = localStorage.getItem('3dlibAccessToken')
    let url = window.location.origin + "/api/gallery"
    return fetch(url,{headers:{"Content-type":"application/json",token}}).then(res=> { return res.json()})
}

const Upload = () => {
  
  const [images,setimages] = React.useState([])

  const {isLoading,data,isError,error,refetch} = useQuery('images',fetchUserData,{
      staleTime:300000,
      refetchOnMount:false,
  })

  const handleSubmission = async(e)=>{
    e.preventDefault()
    let token = localStorage.getItem('3dlibAccessToken')
    if (!token) return alert('Not Authorised')
    if (images.length ===0) return alert('No Image Selected')
    const myform = new FormData()
    for (let i = 0; i < images.length; i++) {
      if(images[i].size < 1*1024*1024 && images[i].size > 1000){
        myform.append('file',images[i])
      }else{
        alert(`${images[i].name} cannot be uploaded because image size is bigger than 1 mb`)
      }
    }
    let url = window.location.origin+"/api/upload"
    const res = await fetch(url,{headers:{token:token},method:'POST',body:myform})
    const result = await res.json()
    if(result.success){
      alert(result.msg)
      refetch()
    }else{
      alert(result.error)
    }
  }

  const handleDeletion = async(id)=>{
    let token = localStorage.getItem('3dlibAccessToken')
    let deleteUrl = window.location.origin + `/api/image/delete/${id}`
    const res = await fetch(deleteUrl,{headers:{"Content-type":"application/json",token:token}})
    const result = await res.json()
    if (result.success) {
      alert("Deleted")
      refetch()
    }else{
      console.log(result.error)
      alert(result.error)

    }
    
  }



  return (
    <div className='text-white'>
      <h1>Upload images</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmission}>
          <input required onChange={(e)=>{setimages(e.target.files)}} name='file' type="file" accept='image/png, image/jpg, image/jpeg, image/webp' multiple  />
          <button type='submit' className='p-4 bg-green-500 rounded-lg'>Upload</button>
      </form>
      <div>
        <h1>Pre Existing images</h1>
        {isLoading ? <h1>Loading...</h1> : 
        isError ? <h1>{error}</h1> : <div className=' grid grid-cols-4 gap-2'>
        {data?.data.map((item,i)=>{
        return <div className=' flex flex-col justify-center rounded-lg overflow-hidden' key={i}>
          <img className='h-72 w-96' src={`${window.location.origin}/${item.filepath}`}></img>
          <button className='p-2 bg-red-500 rounded-b-lg ' onClick={()=>handleDeletion(item.id)}>Delete</button>
        </div>
      })}
      </div>
          }
        
      </div>
    </div>
  )
}

export default Upload