"use server"
import { Post, downloadQuery } from "@/db/queries/feed"
import Delete from "./delete"
import Download from "./download"
import { auth } from "@/auth"

interface PostProps {
    post?: Post
}

export default async function Post({ post }: PostProps) {

    const session = await auth()
    const download = await downloadQuery.execute()

    const downloadInfoArr = download?.filter(post =>  post.media.type.includes("image") && post.media.type.includes("video"));
    const downloadInfo = downloadInfoArr[0]
    
    return (
        <div className="cont_principal my-28">
            <div className="cont_central">
                <div className="flex cont_modal cont_modal_active">
                    <div className="cont_photo cont_img_back" style={{ background: "#eee", backgroundImage: `url(${post?.media.url})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <div className="flex flex-col justify-between contPhotoDetails">
                            <div className="m-0">
                                <div className="cont_mins">
                                    <div className="sub_mins">
                                        <h3>{post?.mins}</h3>
                                        <span>MINS</span>
                                    </div>
                                    <div className="cont_icon_right">
                                        {/* {post?.user.id === session?.user.id && <Delete id={post?.id ?? 0} postUserId={post?.user.id ?? ""}></Delete>} */}
                                    </div>
                                </div>
                                <div className="cont_servings">
                                    <h3>{post?.servings}</h3>
                                    <span>SERVINGS</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full bottom-0 relative justify-end">
                                <div className="cont_detalles contRecipeTitle">
                                    <div className="contRecipeTitle">
                                        <p className='recipeTitle'>{post?.recipeName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="cont_text_ingredients">
                        <div className="cont_over_hidden">
                            {/* User Account */}
                            <div className="cont_tabs">
                                <div className="imageDivClass rounded-full overflow-hidden w-20 h-20">
                                    <img className="imageClass object-cover object-center w-20 h-20" src={post?.user.image ?? ""} alt="" />
                                </div>
                                <h4 className='username'>{post?.user.name}</h4>
                            </div>
                            <div>
                                <div className="cont_text_det_preparation recipeInfo">

                                    <div className="cont_info_preparation">
                                        <h3 className="recipeName">{post?.recipeName}</h3>
                                    </div>

                                    <div className="cont_text_det_preparation">

                                        <div className="cont_title_preparation">
                                            <p>Description</p>
                                        </div>
                                        <div className="cont_info_preparation">
                                            <p>{post?.content}</p>
                                        </div>

                                    </div>

                                    <div className="contDownload">
                                        {/* <Download id={post?.id ?? 0} keyProp={downloadInfo?.media?.url ?? ""}></Download> */}
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
