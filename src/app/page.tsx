"use client"
import Image from 'next/image'

export default function Home() {


  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <main>

      <div className="cont_principal">
        <div className="cont_central">
          <div className="cont_modal cont_modal_active">
            <div className="cont_photo">
              <div className="cont_img_back">
                <img src="https://s-media-cache-ak0.pinimg.com/736x/57/98/9f/57989f2a2e186e38bf93429aa395120c.jpg" alt="" />
              </div>
              <div className="cont_mins">
                <div className="sub_mins">
                  <h3>50</h3>
                  <span>MINS</span>
                </div>
                {/* Make into delete button */}
                <div className="cont_icon_right">
                  <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="deleteButton w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </button>
                </div>
              </div>
              <div className="cont_servings">
                <h3>4</h3>
                <span>SERVINGS</span>
              </div>
              <div className="cont_detalles contRecipeTitle">
                <div className="contRecipeTitle">
                  <p className='recipeTitle'>Shakshuka With Feta</p>
                </div>
              </div>
            </div>


            <div className="cont_text_ingredients">
              <div className="cont_over_hidden">
                {/* User Account */}
                <div className="cont_tabs">
                  <div className="imageDivClass rounded-full overflow-hidden w-20 h-20">
                    <img className="imageClass object-cover object-center w-20 h-20" src="/profilePic.png" alt="" />
                  </div>
                  <h4 className='username'>Stephane Lubendo</h4>
                </div>
                <div>
                  <div className="cont_text_det_preparation recipeInfo">

                    <div className="cont_info_preparation">
                      <h3 className="recipeName">Shakshuka With Feta</h3>
                    </div>

                    <div className="cont_text_det_preparation">

                      <div className="cont_title_preparation">
                        <p>Description</p>
                      </div>
                      <div className="cont_info_preparation">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis est est aliquam, sed faucibus massa lobortis. Maecenas non est justo.</p>
                      </div>

                    </div>

                    <form action="/" className="contDownload">
                      <button className="download">Download Recipe</button>
                    </form>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>


    </main>
  )
}
