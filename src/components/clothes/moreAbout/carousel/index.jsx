/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MenuCloseIcons, NoImg } from "../../../../assets/icon";

export default function Carousel({ data, height }) {

  // const [modalOfCarsouel, setModalOfCarsouel] = useState(false)

  const [imageOne, setImageOne] = useState({
    id1: 1,
    product_color_id1: null,
    product_id1: null,
    status1: null,
    status_reason1: null,
    status_update1: null,
    url_photo1: null,
    url_photo_change1: null,
    url_File1: null,
    changed1: false
  });
  const [imageTwo, setImageTwo] = useState({
    id2: 2,
    product_color_id2: null,
    product_id2: null,
    status2: null,
    status_reason2: null,
    status_update2: null,
    url_photo2: null,
    url_photo_change2: null,
    url_File2: null,
    changed2: false

  });
  const [imageThree, setImageThree] = useState({
    id3: 3,
    product_color_id3: null,
    product_id3: null,
    status3: null,
    status_reason3: null,
    status_update3: null,
    url_photo3: null,
    url_photo_change3: null,
    url_File3: null,
    changed3: false

  });
  const [imageFour, setImageFour] = useState({
    id4: 4,
    product_color_id4: null,
    product_id4: null,
    status4: null,
    status_reason4: null,
    status_update4: null,
    url_photo4: null,
    url_photo_change4: null,
    url_File4: null,
    changed4: false

  });

  console.log(data?.photos,'data');
  console.log(imageOne, 'imageOne');
  console.log(imageTwo, 'imageTwo');
  console.log(imageThree, 'imageThree');
  console.log(imageFour, 'imageFour');


  useEffect(() => {
    if (data?.photos) {
      setImageOne({
        id1: data.photos[0]?.id && data.photos[0]?.id || 1,
        product_color_id1: data.photos[0]?.product_color_id && data.photos[0]?.product_color_id || null,
        product_id1: data.photos[0]?.product_id && data.photos[0]?.product_id || null,
        status1: data.photos[0]?.status && data.photos[0]?.status || null,
        url_photo1: data.photos[0]?.url_photo && data.photos[0]?.url_photo || null,
        url_photo_change1: data.photos[0]?.url_photo && data.photos[0]?.url_photo || null,
      })

      setImageTwo({
        id2: data?.photos[1]?.id && data?.photos[1]?.id || 2,
        product_color_id2: data?.photos[1]?.product_color_id && data?.photos[1]?.product_color_id || null,
        product_id2: data?.photos[1]?.product_id && data?.photos[1]?.product_id || null,
        status2: data?.photos[1]?.status && data?.photos[1]?.status || null,
        url_photo2: data?.photos[1]?.url_photo && data?.photos[1]?.url_photo || null,
        url_photo_change2: data?.photos[1]?.url_photo && data?.photos[1]?.url_photo || null,
      })

      setImageThree({
        id3: data?.photos[2]?.id && data?.photos[2]?.id || 3,
        product_color_id3: data?.photos[2]?.product_color_id && data?.photos[2]?.product_color_id || null,
        product_id3: data?.photos[2]?.product_id && data?.photos[2]?.product_id || null,
        status3: data?.photos[2]?.status && data?.photos[2]?.status || null,
        url_photo3: data?.photos[2]?.url_photo && data?.photos[2]?.url_photo || null,
        url_photo_change3: data?.photos[2]?.url_photo && data?.photos[2]?.url_photo || null,
      })

      setImageFour({
        id4: data.photos[3]?.id && data.photos[3]?.id || 4,
        product_color_id4: data.photos[3]?.product_color_id && data.photos[3]?.product_color_id || null,
        product_id4: data.photos[3]?.product_id && data.photos[3]?.product_id || null,
        status4: data.photos[3]?.status && data.photos[3]?.status || null,
        url_photo4: data.photos[3]?.url_photo && data.photos[3]?.url_photo || null,
        url_photo_change4: data.photos[3]?.url_photo && data.photos[3]?.url_photo || null,
      })
    }
  }, [data?.photos])

    const handleLocationImage1 = (e) => {
    setImageOne({
      ...imageOne,
      url_File1: e.target.files[0],
      url_photo1: URL.createObjectURL(e.target.files[0]),
      changed1: true
    })

  };
  const handleLocationImage2 = (e) => {
    setImageTwo({
      ...imageTwo,
      url_File2: e.target.files[0],
      url_photo2: URL.createObjectURL(e.target.files[0]),
      changed2: true
    })

  };
  const handleLocationImage3 = (e) => {
    setImageThree({
      ...imageThree,
      url_File3: e.target.files[0],
      url_photo3: URL.createObjectURL(e.target.files[0]),
      changed3: true
    })

  };
  const handleLocationImage4 = (e) => {
    setImageFour({
      ...imageFour,
      url_File4: e.target.files[0],
      url_photo4: URL.createObjectURL(e.target.files[0]),
      changed4: true,
    })

  };

  const [modalId, setModalId] = useState(null);
  const [modalOfCarsouel, setModalOfCarsouel] = useState(false)
    const [freeModalUploadImg, setFreeModalUploadImg] = useState(false)

  function handleFreeModalUploadImg(id) {
    setFreeModalUploadImg(true)
    setModalId(id)
  }

  function handleClickCarosuel() {
    setModalOfCarsouel(true)
  }






  return (
    <div>
      {/* <div className={`w-full ${height} rounded-lg overflow-hidden cursor-pointer`} >
       {data?.photos && data.photos.length ?
       (
        <div 
          style={{
            backgroundImage: `url("${data?.photos[0]?.url_photo}")`,
            backgroundColor: "rgba(0,0,0,0.6)",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "darken",
          }}
          className="w-full h-full">
            <div className="flex items-center justify-center w-[350px] h-[377px]  backdrop-blur-md">
              <img
                className="
                h-full
                w-full
                mx-auto 
                align-middle object-contain cursor-pointer "
                src={data?.photos[0]?.url_photo}
                alt=""
              />
            </div>
        </div>
        ):(
        <span className="w-full h-full flex items-center justify-center">
          <NoImg/>
        </span>
       )
       }
      </div> 
      <div className="w-full flex items-center h-fit md:mt-3">
        { data?.photos?.length > 1 ? (
          data?.photos?.map( item => {
            return(
              <button 
                type="button"
                onClick={()=> {
                  handleClickCarosuel()
                  setModalId(item?.id)
                }}
                className="w-[110px] h-fit border border-red rounded-lg overflow-hidden">
                <img
                  key={item?.id}
                  className="object-cover rounded-lg"
                  src={item?.url_photo}
                  alt=""
                />
              </button>
            )
          })
        ) : (
        <div className="w-full flex items-center justify-between gap-x-2">
          <button 
            type="button"
            className="w-[110px] h-[124px] flex items-center justify-between border border-red rounded-lg overflow-hidden">
            <span className="w-full h-fit flex items-center justify-center">
              <NoImg />
            </span>
          </button>
          <button 
            type="button"
            className="w-[110px] h-[124px] flex items-center justify-between border border-red rounded-lg overflow-hidden">
            <span className="w-full h-fit flex items-center justify-center">
              <NoImg />
            </span>
          </button>
          <button 
            type="button"
            className="w-[110px] h-[124px] flex items-center justify-between border border-red rounded-lg overflow-hidden">
            <span className="w-full h-fit flex items-center justify-center">
              <NoImg width="" height=""/>
            </span>
          </button>
        </div>
        )
        }
      </div>  */}

      <section
        onClick={() => {
          setModalOfCarsouel(false)
        }}
        className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 
        ${modalOfCarsouel ? "" : "hidden"
          }`}
      ></section>

      <section
          className={`fixed z-[201] rounded-lg bg-white  w-fit h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${modalOfCarsouel ? "" : "hidden"
            }`}
        >
          <button
            onClick={() => setModalOfCarsouel(false)}
            className="absolute top-0  z-[116] right-[-80px]  flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#808080]">
            <MenuCloseIcons colors="#fff" />
          </button>
          <div>
            <div
              className="w-[670px] h-fit bg-white rounded-lg mt-[-4px] p-0 m-0 "
            >
              <div className="w-full  flex flex-col items-center justify-start ">
                {modalId == imageOne?.id1 &&
                  <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                    <div className="w-full h-[80vh] flex items-center">
                      <div className="w-full h-full flex flex-col items-center justify-center"> 
                        {imageOne?.url_photo1 !== null ? (
                          <img
                            src={imageOne?.url_photo1}
                            alt="backImg"
                            className="w-[670px] h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                          />
                          ) : (
                            <span><NoImg /></span>
                          )
                        }
                      </div>
                    </div>
                    <div className={`w-full justify-between flex items-center px-3 h-[50px]`}>
                      <button className="text-green-500 active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Одобрить
                      </button>
                      <button className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Отказать
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageTwo?.id2 &&
                 <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                    <div className="w-full h-[80vh] flex items-center">
                        <div className="w-full h-full flex flex-col items-center justify-center"> 
                          {imageTwo?.url_photo2 !== null ? (
                            <img
                              src={imageTwo?.url_photo2}
                              alt="backImg"
                              className="w-[670px] h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                            />
                            ) : (
                              <span><NoImg /></span>
                            )
                          }
                        </div>
                    </div>
                    <div className={`w-full justify-between flex items-center px-3 h-[50px]`}>
                      <button className="text-green-500 active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Одобрить
                      </button>
                      <button className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Отказать
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageThree?.id3 &&
                  <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                    <div className="w-full h-[80vh] flex items-center">
                        <div className="w-full h-full flex flex-col items-center justify-center"> 
                          {imageThree?.url_photo3 !== null ? (
                            <img
                              src={imageThree?.url_photo3}
                              alt="backImg"
                              className="w-[670px] h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                            />
                            ) : (
                              <span><NoImg /></span>
                            )
                          }
                        </div>
                    </div>
                    <div className={`w-full justify-between flex items-center px-3 h-[50px]`}>
                      <button className="text-green-500 active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Одобрить
                      </button>
                      <button className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Отказать
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageFour?.id4 &&
                 <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                    <div className="w-full h-[80vh] flex items-center">
                        <div className="w-full h-full flex flex-col items-center justify-center"> 
                          {imageFour?.url_photo4 !== null ? (
                            <img
                              src={imageFour?.url_photo4}
                              alt="backImg"
                              className="w-[670px] h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                            />
                            ) : (
                              <span><NoImg /></span>
                            )
                          }
                        </div>
                    </div>
                    <div className={`w-full justify-between flex items-center px-3 h-[50px]`}>
                      <button className="text-green-500 active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Одобрить
                      </button>
                      <button className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">
                          Отказать
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>

      <div className="w-full h-full flex flex-col">
          <div className="w-full h-[404px]  flex items-center">
            <div className="w-full h-full rounded-[12px] border overflow-hidden" >
              <div className={`h-full`}>
                <article
                  onClick={() => { 
                      handleClickCarosuel() 
                      setModalId(imageOne?.id1)
                      } 
                  }
                  className="w-full flex flex-col h-full ">
                    {/* {imageOne?.status1 &&
                    <div className="w-fit flex h-[22px] items-center mb-[6px]  border rounded-[12px]">
                      <div className="w-fit h-fit flex items-center gap-x-3">
                        <button
                          type="button"
                          className={`w-[22px] h-[22px] rounded-full border `}
                        ></button>

                        {imageOne?.status1 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {imageOne?.status1 || "status"}
                        </td>}
                        {imageOne?.status1 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {imageOne?.status1 || "status"}
                        </td>}
                        {imageOne?.status1 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {imageOne?.status1 || "status"}
                        </td>}
                      </div>
                    </div>} */}
                  <div
                    style={{
                      backgroundImage: ` url("${imageOne?.url_photo1}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                    }}
                    className="BackgImageBLur h-full flex items-center justify-center ">
                    <div className="flex items-center justify-center w-[350px] h-[377px]  backdrop-blur-md">
                      <img
                        className="h-full w-full mx-auto align-middle object-contain cursor-pointer "
                        src={imageOne?.url_photo1}
                        alt=""
                      />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className="w-full mt-[10px] h-[124px] flex justify-between gap-x-[6px]   rounded-lg">
            <div className={`w-[30%] h-full flex-col items-center justify-start`}>
              <button
                type="button"
                className="h-[96px] w-full flex items-center border justify-center overflow-hidden rounded-lg"
              >
                {!imageTwo?.url_photo2 ?
                  <div
                    // htmlFor={"imageTwo"}
                    // onClick={ () => 
                    //   handleFreeModalUploadImg(imageTwo?.id2)
                    // }
                    onClick={() => { 
                      handleClickCarosuel() 
                      setModalId(imageTwo?.id2)
                      } }
                    className="h-full w-full cursor-pointer text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                  >
                    <div className="w-full h-full overflow-hidden bg-photoBg  flex flex-col items-center  justify-center">
                      <span><NoImg /></span>
                    </div>
                  </div>
                  :
                  <div
                    onClick={() => {
                      handleClickCarosuel()
                      setModalId(imageTwo?.id2)
                    }}
                    style={{
                      backgroundImage: `url("${imageTwo?.url_photo2}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                    }}
                    className="BackgImageBLur overflow-hidden  w-full h-full rounded-lg flex items-center justify-center  ">
                    <div className="flex items-center justify-center w-full h-full  backdrop-blur-md">
                      <img className="h-full w-full mx-auto  align-middle object-contain cursor-pointer"
                        src={imageTwo?.url_photo2}
                        alt=""
                      />
                    </div>
                  </div>
                }
              </button>
              {/* <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                <div className="w-fit h-fit flex items-center">
                  <button
                    type="button"
                    className={`w-[22px] h-[22px] rounded-full border `}
                  ></button>
                  {imageTwo?.status2 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageTwo?.status2 || "status"}
                  </td>}
                  {imageTwo?.status2 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageTwo?.status2 || "status"}
                  </td>}
                  {imageTwo?.status2 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageTwo?.status2 || "status"}
                  </td>}
                </div>
              </div> */}
            </div>

            {/* IMG THREE */}
            <div className={`w-[30%] h-full  flex-col items-center justify-start `} >
              <button
                type="button"
                className="h-[96px] w-full flex items-center border rounded-lg overflow-hidden justify-center "
              >
                {!imageThree?.url_photo3 ?
                  <div
                    // onClick={
                    //     () => 
                    //     handleFreeModalUploadImg(imageThree?.id3)
                    //   }
                     onClick={() => { 
                      handleClickCarosuel() 
                      setModalId(imageThree?.id3)
                      } }
                    className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                  >
                    <div
                      className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col  items-center justify-center">
                      <NoImg />
                    </div>
                  </div>
                  :
                  <div
                    onClick={ () => {
                      handleClickCarosuel()
                      setModalId(imageThree?.id3)
                    }}
                    style={{
                      backgroundImage: ` url("${imageThree?.url_photo3}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                    }}
                    className="BackgImageBLur  overflow-hidden  w-full h-full rounded-lg flex items-center justify-center   ">
                    <div className="flex items-center justify-center w-full h-full  backdrop-blur-md">
                      <img
                        className="
                    h-full
                    w-full
                    mx-auto 
                    align-middle object-contain cursor-pointer "
                        src={imageThree?.url_photo3}
                        alt=""
                      />
                    </div>
                  </div>
                }
              </button>
              {/* <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                <div className="w-fit h-fit flex items-center">
                  <button
                    type="button"
                    className={`w-[22px] h-[22px] rounded-full border `}
                  ></button>
                  {imageThree?.status3 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageThree?.status3 || "status"}
                  </td>}
                  {imageThree?.status3 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageThree?.status3 || "status"}
                  </td>}
                  {imageThree?.status3 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageThree?.status3 || "status"}
                  </td>}
                </div>
              </div> */}
            </div>

            {/* IMG FOUR */}
            <div className={`w-[30%] h-full  flex-col items-center justify-start`} >
              <button
                type="button"
                className="h-[96px] w-full flex items-center border rounded-lg overflow-hidden justify-center "
              >
                {!imageFour?.url_photo4 ?
                  <div
                    // onClick={
                    //     () => handleFreeModalUploadImg(imageFour?.id4)}
                     onClick={() => { 
                      handleClickCarosuel() 
                      setModalId(imageTwo?.id2)
                      } }
                    className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                  >
                    <div
                      className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col  items-center justify-center">
                      <NoImg />
                    </div>
                  </div>
                  :
                  <div
                    onClick={ () => {
                      handleClickCarosuel()
                      setModalId(imageFour?.id4)
                    }}
                    style={{
                      backgroundImage: `url("${imageFour?.url_photo4}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                    }}
                    className="BackgImageBLur  overflow-hidden w-full h-full rounded-lg  flex items-center justify-center ">
                    <div className="flex items-center justify-center w-full h-full  backdrop-blur-md ">
                      <img
                        className="
                    h-full
                    w-full
                    mx-auto 
                    align-middle object-contain cursor-pointer "
                        src={imageFour?.url_photo4}
                        alt=""
                      />
                    </div>
                  </div>
                }
              </button>
              {/* <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                <div className="w-fit h-fit flex items-center">
                  <button
                    type="button"
                    className={`w-[22px] h-[22px] rounded-full border `}
                  ></button>
                  {imageFour?.status4 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageFour?.status4 || "status"}
                  </td>}
                  {imageFour?.status4 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageFour?.status4 || "status"}
                  </td>}
                  {imageFour?.status4 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                    {imageFour?.status4 || "status"}
                  </td>}
                </div>
              </div> */}
            </div>
          </div>
        </div >
    </div>
  );
}
