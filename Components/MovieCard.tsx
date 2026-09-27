import { FC } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavouriteButton from "./FavouriteButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface MovieCardProps {
	data: Record<string, any>;
}

const MovieCard: FC<MovieCardProps> = ({ data }) => {
	const router = useRouter();
	const { openModal } = useInfoModal();

	return (
		<div className="group bg-zinc-900 col-span relative h-[12vw]">
			<img
				src={data.thumbnailUrl}
				alt={data.title || "Movie"}
				className="
                    cursor-pointer
                    object-cover
                    transition-all
                    duration-300
                    shadow-xl
                    rounded-md
                    group-hover:opacity-0
                    w-full
                    h-[12vw]
                    "
			/>
			<div
				className="
                    opacity-0
                    absolute
                    top-0
                    transition-all
                    duration-300
                    delay-150
                    ease-in-out
                    transform-gpu
                    z-20
                    invisible
                    sm:visible
                    w-full
                    scale-100
                    group-hover:scale-110
                    group-hover:-translate-y-[5vw]
                    group-hover:opacity-100
                    shadow-2xl
                    "
			>
				<img
					src={data.thumbnailUrl}
					alt={data.title || "Movie"}
					className="
                        cursor-pointer
                        object-cover
                        transition-all
                        duration-300
                        shadow-xl
                        rounded-t-md
                        w-full
                        h-[12vw]
                    "
				/>
				<div
					className="
                        z-10
                        bg-zinc-800
                        p-2
                        lg:p-4
                        absolute
                        w-full
                        transition-all
                        duration-300
                        shadow-md
                        rounded-b-md
                        "
				>
					<div className="flex gap-2 flex-col items-start mt-1">
						<div className="flex gap-2 w-full items-center">
							<div
								className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300 hover:scale-105 duration-200"
								onClick={() =>
									router.push(`/watch/${data?.id}`)
								}
							>
								<BsFillPlayFill
									className="text-black ml-0.5"
									size={24}
								/>
							</div>
							<div className="flex gap-2">
								<FavouriteButton movieId={data.id} />
							</div>
							<div
								onClick={() => openModal(data?.id)}
								className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 rounded-full border-2 border-white/50 flex justify-center items-center transition hover:border-white hover:bg-white/10 duration-200"
							>
								<AiOutlineInfoCircle
									className="text-white group-hover/item:text-neutral-300"
									size={20}
								/>
							</div>
						</div>

						<p className="text-green-400 font-semibold text-xs lg:text-sm mt-1">
							New <span className="text-white font-normal">2023</span>
						</p>
						<div className="flex flex-row gap-2 items-center">
							<p className="text-white text-[10px] lg:text-sm">
								{data.duration}
							</p>
						</div>
						<div className="flex flex-row items-center gap-2 text-[8px] text-white lg:text-sm font-medium">
							<p>{data.genre}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
