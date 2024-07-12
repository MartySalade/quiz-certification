import useGetOpenTriviaData from "../../hooks/useGetOpenTriviaData";
import { Categories } from "../../types/categories";

type Props = {
  handleCategoryChange: (newValue: number) => void;
};

/**
 * This component allow the user to select a category from the list fetched in the
 * useGetOpenTriviaData() hook
 */
export function CategorySelect({ handleCategoryChange }: Props) {
  const { data, isLoading, error } =
    useGetOpenTriviaData<Categories>("api_category.php");

  return (
    <>
      {error && (
        <div className="p-2 px-4 bg-red-100 border rounded border-red-500">
          {error.name}: {error.message}
        </div>
      )}
      {isLoading && (
        <div className="rounded h-10 w-72 bg-slate-200 animate-pulse p-2 flex items-center">
          <div className="h-6 w-1/3 bg-slate-400 rounded" />
        </div>
      )}
      {!isLoading && data && (
        <select
          onChange={(e) => handleCategoryChange(parseInt(e.target.value))}
          name="category"
          id="categorySelect"
          className="bg-slate-200 rounded p-2 min-w-72"
        >
          {data.trivia_categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
