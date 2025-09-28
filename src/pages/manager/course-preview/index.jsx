import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import TextContent from "./components/TextContent";
import VideoContent from "./components/VideoContent";
import Header from "../../../components/Header";

const ManageCoursePreviewPage = ({ isAdmin = true }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = useLoaderData();

  const [active, setActive] = useState(course?.details[0]);

  const handleNextContent = (content) => {
    const currIndex = course?.details?.findIndex(
      (val) => val._id === content._id
    );

    if (currIndex < course?.details?.length - 1) {
      setActive(course.details[currIndex + 1]);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="sidebar-container fixed h-[calc(100vh-20px)] w-full max-w-[330px] my-[10px] ml-[10px] bg-[#060A23] overflow-hidden flex flex-1 rounded-[20px]">
        <div className="scroll-container flex w-full overflow-y-scroll hide-scrollbar">
          <nav className="flex flex-col w-full h-fit p-[30px] gap-[30px] z-10">
            <a
              onClick={() =>
                navigate(isAdmin ? `/manager/courses/${id}` : "/student")
              }
              className="font-semibold text-white hover:underline cursor-pointer"
            >
              <span>Back to Dashboard</span>
            </a>
            <div className="flex flex-col gap-4">
              <div className="flex shrink-0 w-[130px] h-[100px] rounded-[14px] bg-[#D9D9D9] overflow-hidden">
                <img
                  src={course?.thumbnail_url}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <h2 className="font-bold text-xl leading-[34px] text-white">
                {course?.name}
              </h2>
            </div>
            <ul className="flex flex-col gap-4">
              {course?.details?.map((item) => (
                <li key={item._id}>
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setActive(item)}
                  >
                    <div
                      className={`flex items-center gap-3 w-full cursor-pointer rounded-full border p-[14px_20px] transition-all duration-300 ${
                        active._id === item._id
                          ? "bg-[#662FFF] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                          : "bg-[#070B24] shadow-[-10px_-6px_10px_0_#181A35_inset]"
                      } hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] border-[#24283E]`}
                    >
                      <img
                        src={`/assets/images/icons/${
                          item.type === "text"
                            ? "note-white"
                            : "video-play-white"
                        }.svg`}
                        className="w-6 h-6"
                        alt="icon"
                      />
                      <span className="w-full font-semibold text-white line-clamp-1 transition-all duration-300 hover:line-clamp-none">
                        {item?.title}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <img
          src="/assets/images/backgrounds/sidebar-glow.png"
          className="absolute object-contain object-bottom bottom-0"
          alt="background"
        />
      </aside>
      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[340px]">
        <Header type={isAdmin ? "manager" : "student"} />
        <div className="relative flex flex-col gap-[26px]">
          {active.type === "text" ? (
            <TextContent content={active} handleNext={handleNextContent} />
          ) : (
            <VideoContent content={active} handleNext={handleNextContent} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageCoursePreviewPage;
