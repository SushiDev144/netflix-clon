import fetcher from "@/lib/fetcher";
import useSWR from "swr";

function useBillBoard() {
	const { data, error, isLoading } = useSWR("/api/random", fetcher);

	return {
		data,
		error,
		isLoading,
	};
}

export default useBillBoard;
