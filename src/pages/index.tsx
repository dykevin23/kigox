import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout hasGnbMenu>
      <div className="flex flex-col gap-2">
        <div className="mx-2">
          <div className="flex border-b-2 items-center justify-between h-12">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              ></path>
            </svg>
            <h4>KIGOX</h4>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="mx-2">
          <div className="flex items-center justify-center bg-slate-400 h-40">
            slide 영역
          </div>
        </div>

        <div className="mx-2">
          <div className="flex flex-col space-y-3 divide-y">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="flex gap-5 pt-3">
                <div className="bg-slate-300 h-28 w-28 rounded-md" />
                <div className="flex flex-col w-96">
                  <span>유모차 팔아요</span>
                  <span>1,000,000원</span>
                  <span>직거래 (판매중)</span>
                  <div className="flex justify-between pt-4">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        ></path>
                      </svg>
                      1
                    </div>

                    <span>11시간 전</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
