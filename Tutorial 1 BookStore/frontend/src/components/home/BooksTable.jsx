// ============================================================
// BooksTable.jsx
// ------------------------------------------------------------
// PURPOSE: Renders the list of books as an HTML table. Used by
// Home.jsx when the user has selected "Table View".
// ============================================================

import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

// Receives the full books array as a prop from Home.jsx.
const BooksTable = ({books}) => {
	return (
		<table className="w-full border-sepearte border-spacing-2">
			<thead>
				<tr>
					<th className="border border-slate-600 rounded-md">No</th>
					<th className="border border-slate-600 rounded-md">Title</th>
					{/* max-md:hidden -> these columns are hidden on small screens
					    to keep the table readable on mobile */}
					<th className="border border-slate-600 rounded-md max-md:hidden">
						Author
					</th>
					<th className="border border-slate-600 rounded-md max-md:hidden">
						Publish Year
					</th>
					<th className="border border-slate-600 rounded-md">Operations</th>
				</tr>
			</thead>
			<tbody>
				{/* One row per book. key={book._id} lets React efficiently
				    track/re-render rows when the list changes. */}
				{books.map((book, index) => (
					<tr key={book._id} className="h-8">
						<td className="border border-slate-700 rounded-md text-center">
							{index + 1}
						</td>
						<td className="border border-slate-700 rounded md text-center">
							{book.title}
						</td>
						<td className="border border-slate-700 rounded-md text-center max-md:hidden">
							{book.author}
						</td>
						<td className="border border-slate-700 rounded-md text-center max-md:hidden">
							{book.publishYear}
						</td>
						<td className="border border-slate-700 rounded md text-center">
							{/* Action icons, each linking to the relevant page for this book */}
							<div className="flex justify-center gap-x-4">
								<Link to={`/books/details/${book._id}`}>
									<BsInfoCircle className="text-2xl text-green-800" />
								</Link>
								<Link to={`/books/edit/${book._id}`}>
									<AiOutlineEdit className="text-2xl text-yellow-600" />
								</Link>
								<Link to={`/books/delete/${book._id}`}>
									<MdOutlineDelete className="text-2xl text-red-600" />
								</Link>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default BooksTable;