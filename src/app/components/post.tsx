import Delete from "./delete"
import Download from "./download"

interface PostProps {
    post?: string
}

export default function Post(post: PostProps) {


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
                                <div className="cont_icon_right">
                                    <Delete id={0}></Delete>
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

                                        <div className="contDownload">
                                            <Download id={0}></Download>
                                        </div>
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
