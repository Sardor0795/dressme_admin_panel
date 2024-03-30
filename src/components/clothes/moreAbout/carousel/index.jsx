/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MenuCloseIcons, NoImg, StarIcon } from "../../../../assets/icon";

export default function Carousel({ data, filteredPhotos }) {
  const [imageOne, setImageOne] = useState({
    id1: null,
    product_color_id1: null,
    product_id1: null,
    status1: null,
    status_reason1: null,
    status_update1: null,
    url_photo1: null,
    url_photo_change1: null,
    url_File1: null,
    changed1: false,
  });
  const [imageTwo, setImageTwo] = useState({
    id2: null,
    product_color_id2: null,
    product_id2: null,
    status2: null,
    status_reason2: null,
    status_update2: null,
    url_photo2: null,
    url_photo_change2: null,
    url_File2: null,
    changed2: false,
  });
  const [imageThree, setImageThree] = useState({
    id3: null,
    product_color_id3: null,
    product_id3: null,
    status3: null,
    status_reason3: null,
    status_update3: null,
    url_photo3: null,
    url_photo_change3: null,
    url_File3: null,
    changed3: false,
  });
  const [imageFour, setImageFour] = useState({
    id4: null,
    product_color_id4: null,
    product_id4: null,
    status4: null,
    status_reason4: null,
    status_update4: null,
    url_photo4: null,
    url_photo_change4: null,
    url_File4: null,
    changed4: false,
  });

  useEffect(() => {
    if (filteredPhotos?.length) {
      setImageOne({
        id1: (filteredPhotos[0]?.id && filteredPhotos[0]?.id) || null,
        product_color_id1:
          (filteredPhotos[0]?.product_color_id &&
            filteredPhotos[0]?.product_color_id) ||
          null,
        product_id1:
          (filteredPhotos[0]?.product_id && filteredPhotos[0]?.product_id) ||
          null,
        status1:
          (filteredPhotos[0]?.status && filteredPhotos[0]?.status) || null,
        url_photo1:
          (filteredPhotos[0]?.url_photo && filteredPhotos[0]?.url_photo) ||
          null,
        url_photo_change1:
          (filteredPhotos[0]?.url_photo && filteredPhotos[0]?.url_photo) ||
          null,
      });

      setImageTwo({
        id2: (filteredPhotos[1]?.id && filteredPhotos[1]?.id) || null,
        product_color_id2:
          (filteredPhotos[1]?.product_color_id &&
            filteredPhotos[1]?.product_color_id) ||
          null,
        product_id2:
          (filteredPhotos[1]?.product_id && filteredPhotos[1]?.product_id) ||
          null,
        status2:
          (filteredPhotos[1]?.status && filteredPhotos[1]?.status) || null,
        url_photo2:
          (filteredPhotos[1]?.url_photo && filteredPhotos[1]?.url_photo) ||
          null,
        url_photo_change2:
          (filteredPhotos[1]?.url_photo && filteredPhotos[1]?.url_photo) ||
          null,
      });

      setImageThree({
        id3: (filteredPhotos[2]?.id && filteredPhotos[2]?.id) || null,
        product_color_id3:
          (filteredPhotos[2]?.product_color_id &&
            filteredPhotos[2]?.product_color_id) ||
          null,
        product_id3:
          (filteredPhotos[2]?.product_id && filteredPhotos[2]?.product_id) ||
          null,
        status3:
          (filteredPhotos[2]?.status && filteredPhotos[2]?.status) || null,
        url_photo3:
          (filteredPhotos[2]?.url_photo && filteredPhotos[2]?.url_photo) ||
          null,
        url_photo_change3:
          (filteredPhotos[2]?.url_photo && filteredPhotos[2]?.url_photo) ||
          null,
      });

      setImageFour({
        id4: (filteredPhotos[3]?.id && filteredPhotos[3]?.id) || null,
        product_color_id4:
          (filteredPhotos[3]?.product_color_id &&
            filteredPhotos[3]?.product_color_id) ||
          null,
        product_id4:
          (filteredPhotos[3]?.product_id && filteredPhotos[3]?.product_id) ||
          null,
        status4:
          (filteredPhotos[3]?.status && filteredPhotos[3]?.status) || null,
        url_photo4:
          (filteredPhotos[3]?.url_photo && filteredPhotos[3]?.url_photo) ||
          null,
        url_photo_change4:
          (filteredPhotos[3]?.url_photo && filteredPhotos[3]?.url_photo) ||
          null,
      });
    } else {
      let id = data?.colors[0]?.pivot?.id;

      const filtered = data?.photos?.filter(
        (item) => item?.product_color_id === id
      );

      setImageOne({
        id1: (filtered[0]?.id && filtered[0]?.id) || null,
        product_color_id1:
          (filtered[0]?.product_color_id && filtered[0]?.product_color_id) ||
          null,
        product_id1:
          (filtered[0]?.product_id && filtered[0]?.product_id) || null,
        status1: (filtered[0]?.status && filtered[0]?.status) || null,
        url_photo1: (filtered[0]?.url_photo && filtered[0]?.url_photo) || null,
        url_photo_change1:
          (filtered[0]?.url_photo && filtered[0]?.url_photo) || null,
      });
      setImageTwo({
        id2: (filtered[1]?.id && filtered[1]?.id) || null,
        product_color_id2:
          (filtered[1]?.product_color_id && filtered[1]?.product_color_id) ||
          null,
        product_id2:
          (filtered[1]?.product_id && filtered[1]?.product_id) || null,
        status2: (filtered[1]?.status && filtered[1]?.status) || null,
        url_photo2: (filtered[1]?.url_photo && filtered[1]?.url_photo) || null,
        url_photo_change2:
          (filtered[1]?.url_photo && filtered[1]?.url_photo) || null,
      });

      setImageThree({
        id3: (filtered[2]?.id && filtered[2]?.id) || null,
        product_color_id3:
          (filtered[2]?.product_color_id && filtered[2]?.product_color_id) ||
          null,
        product_id3:
          (filtered[2]?.product_id && filtered[2]?.product_id) || null,
        status3: (filtered[2]?.status && filtered[2]?.status) || null,
        url_photo3: (filtered[2]?.url_photo && filtered[2]?.url_photo) || null,
        url_photo_change3:
          (filtered[2]?.url_photo && filtered[2]?.url_photo) || null,
      });

      setImageFour({
        id4: (filtered[3]?.id && filtered[3]?.id) || null,
        product_color_id4:
          (filtered[3]?.product_color_id && filtered[3]?.product_color_id) ||
          null,
        product_id4:
          (filtered[3]?.product_id && filtered[3]?.product_id) || null,
        status4: (filtered[3]?.status && filtered[3]?.status) || null,
        url_photo4: (filtered[3]?.url_photo && filtered[3]?.url_photo) || null,
        url_photo_change4:
          (filtered[3]?.url_photo && filtered[3]?.url_photo) || null,
      });
    }
  }, [filteredPhotos]);

  const [modalId, setModalId] = useState(null);
  const [modalOfCarsouel, setModalOfCarsouel] = useState(false);

  function handleClickCarosuel() {
    setModalOfCarsouel(true);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // DISABLE BACKGROUND SCROLL WHEN MODAI IS OPENED
  useEffect(() => {
    if (modalOfCarsouel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOfCarsouel]);

  return (
    <div className="w-[290px] mx-auto md:mx-0">
      <div className="flex items-center mb-[5px]">
        <div className="font-AeonikProRegular text-[16px] mr-[5px] ml-[10px]">
          Фото
        </div>
        <StarIcon />

        {data?.colors?.map((item) => {
          if (imageOne?.product_color_id1 === item?.pivot?.id) {
            return (
              <div
                key={item?.id}
                className="ml-auto w-fit flex h-[22px] items-center my-[6px] mr-[10px]"
              >
                <div className="w-fit h-fit flex items-center gap-x-3">
                  <span
                    style={{ background: item?.hex }}
                    className={`w-[22px] h-[22px] rounded-full border`}
                  ></span>
                </div>
              </div>
            );
          }
        })}
      </div>
      <section
        onClick={() => {
          setModalOfCarsouel(false);
        }}
        className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60
        ${modalOfCarsouel ? "" : "hidden"}`}
      ></section>

      <section
        className={`fixed z-[201] rounded-lg bg-white  w-fit h-fit mx-4 my-auto md:m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${
          modalOfCarsouel ? "" : "hidden"
        }`}
      >
        <button
          onClick={() => setModalOfCarsouel(false)}
          className="absolute top-[-60px] md:top-0  z-[116] right-0 md:right-[-80px] flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#808080]"
        >
          <MenuCloseIcons colors="#fff" />
        </button>
        <div>
          <div className="md:w-fit h-fit bg-white rounded-lg mt-[-4px] p-0 m-0 ">
            <div className="w-full flex flex-col items-center justify-start ">
              {modalId === imageOne?.id1 && (
                <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                  <div className="w-full h-[80vh] flex items-center">
                    <div className="w-full h-full flex flex-col items-center justify-center border border-searchBgColor overflow-hidden">
                      {imageOne?.url_photo1 && (
                        <img
                          src={imageOne?.url_photo1}
                          alt="backImg"
                          className="w-fit h-[80vh] object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {modalId === imageTwo?.id2 && (
                <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                  <div className="w-full h-[80vh] flex items-center">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      {imageTwo?.url_photo2 && (
                        <img
                          src={imageTwo?.url_photo2}
                          alt="backImg"
                          className="w-fit h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {modalId === imageThree?.id3 && (
                <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                  <div className="w-full h-[80vh] flex items-center">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      {imageThree?.url_photo3 && (
                        <img
                          src={imageThree?.url_photo3}
                          alt="backImg"
                          className="w-fit h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {modalId === imageFour?.id4 && (
                <div className="w-full flex flex-col items-center bg-white rounded-xl overflow-hidden">
                  <div className="w-full h-[80vh] flex items-center">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      {imageFour?.url_photo4 && (
                        <img
                          src={imageFour?.url_photo4}
                          alt="backImg"
                          className="w-fit h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="h-full flex flex-col ">
        {/* IMG ONE */}
        <div className="w-[290px] h-[380px] flex items-center justify-center">
          <div className="w-full h-full rounded-[12px] border overflow-hidden">
            <div className={`h-full`}>
              <div
                onClick={() => {
                  if (imageOne?.url_photo1) {
                    handleClickCarosuel();
                    setModalId(imageOne?.id1);
                  }
                }}
                className="w-full flex flex-col h-full "
              >
                <div className="h-full flex items-center justify-center ">
                  <div
                    style={{
                      backgroundImage: `url("${imageOne?.url_photo1}")`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="flex items-center justify-center w-[290px] h-[380px] cursor-pointer"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-[10px] h-fit flex justify-between gap-x-[6px] rounded-lg">
          {/* IMG TWO */}
          <div className={`w-[30%] h-full flex-col items-center justify-start`}>
            <button
              type="button"
              className="h-[124px] w-full flex items-center justify-center "
            >
              {imageTwo?.url_photo2 === null ? (
                <div className="h-full w-full text-[13px] font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor ">
                  <div className="w-full h-full rounded-lg border bg-photoBg  flex flex-col items-center  justify-center">
                    <span>
                      <NoImg />
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (imageTwo?.url_photo2) {
                      handleClickCarosuel();
                      setModalId(imageTwo?.id2);
                    }
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div
                    style={{
                      backgroundImage: `url("${imageTwo?.url_photo2}")`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="flex items-center border overflow-hidden rounded-lg justify-center w-full h-full"
                  ></div>
                </div>
              )}
            </button>
          </div>

          {/* IMG THREE */}
          <div
            className={`w-[30%] h-full  flex-col items-center justify-start `}
          >
            <button
              type="button"
              className="h-[124px] w-full flex items-center  justify-center "
            >
              {imageThree?.url_photo3 === null ? (
                <div className="h-full w-full bg-photoBg text-[13px] font-AeonikProMedium flex items-center justify-center text-textBlueColor ">
                  <div className="w-full h-full border rounded-lg overflow-hidden bg-photoBg flex items-center justify-center">
                    <NoImg />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (imageThree?.url_photo3) {
                      handleClickCarosuel();
                      setModalId(imageThree?.id3);
                    }
                  }}
                  className="w-full h-full flex items-center justify-center   "
                >
                  <div
                    style={{
                      backgroundImage: `url("${imageThree?.url_photo3}")`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="flex items-center border rounded-lg overflow-hidden justify-center w-full h-full"
                  ></div>
                </div>
              )}
            </button>
          </div>

          {/* IMG FOUR */}
          <div
            className={`w-[30%] h-full  flex-col items-center justify-start`}
          >
            <button
              type="button"
              className="h-[124px] w-full flex items-center  justify-center "
            >
              {imageFour?.url_photo4 === null ? (
                <div className="h-full w-full text-[13px] font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor">
                  <div className="w-full h-full overflow-hidden border rounded-lg  bg-photoBg  flex flex-col  items-center justify-center">
                    <NoImg />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (imageFour?.url_photo4) {
                      handleClickCarosuel();
                      setModalId(imageFour?.id4);
                    }
                  }}
                  className="cursor-pointer w-full h-full flex items-center justify-center "
                >
                  <div
                    style={{
                      backgroundImage: `url("${imageFour?.url_photo4}")`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="flex items-center border rounded-lg overflow-hidden justify-center w-full h-full"
                  ></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
