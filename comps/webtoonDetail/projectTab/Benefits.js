import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Benefits({ benefits }) {
  return (
    <div
      className="mt-7 flex flex-col gap-4"
      style={{ paddingBottom: benefits.length % 2 === 0 ? 56 : 0 }}
    >
      <div className="text-2xl font-bold">Benefits</div>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-0">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className={`h-fit ${
              idx % 2 === 0
                ? "gradientBorder-right sm:mb-11 sm:mr-2.5"
                : "gradientBorder-left sm:translate-y-14 sm:mt-11 sm:ml-2.5"
            } ${item.attributes.active ? "opacity-100" : "opacity-20"}`}
          >
            <div className="m-1.5 p-4 gradientBorder-2 flex flex-col gap-2 items-center justify-center text-center">
              <div className="font-bold">{item.attributes.name}</div>
              <div className="text-sm">
                <ReactMarkdown
                  children={item.attributes.description}
                  components={{
                    a: (props) => (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={props.href}
                        className="text-mintGreen hover:underline"
                      >
                        {props.children}
                      </Link>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {benefits.length === 0 && (
        <div>Be on the lookout for exclusive benefits!</div>
      )}
    </div>
  );
}
