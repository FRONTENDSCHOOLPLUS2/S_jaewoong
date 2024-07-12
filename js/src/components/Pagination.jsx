import { Link } from "react-router-dom";

export default function Pagination() {
  return (
            <div>
              <ul className="flex justify-center gap-3 m-4">
                <li className="text-bold text-blue-700">
                  <Link href="/info?page=1">1</Link>
                </li>
                <li>
                  <Link href="/info?page=2">2</Link>
                </li>
              </ul>
            </div>
  )
}
