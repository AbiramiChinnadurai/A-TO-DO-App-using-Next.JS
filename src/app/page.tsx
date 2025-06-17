"use client";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

export default function Home() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [tasks, setTasks] = useState<{ [key: string]: { time: string; text: string }[] }>({});
  const [taskText, setTaskText] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const handleAddTask = () => {
    if (!taskText || !taskTime) return;
    const newTask = { time: taskTime, text: taskText };
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newTask],
    }));
    setTaskText("");
    setTaskTime("");
  };

  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start, end });
  const leadingEmptyDays = getDay(start);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-100 p-2 md:p-6 font-serif">
      <div className="bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(255,192,203,0.4)] rounded-[40px] grid grid-cols-1 lg:grid-cols-2 h-[95vh] overflow-hidden border-8 border-pink-200 ring-4 ring-rose-100">
        {/* Left - Task Input */}
        <div className="p-4 sm:p-6 bg-[url('/notebook-left.png')] bg-cover bg-no-repeat bg-left rounded-t-[40px] lg:rounded-l-[40px] lg:rounded-tr-none flex flex-col border-b-4 lg:border-b-0 lg:border-r-[6px] border-dotted border-pink-300">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-rose-600 mb-4 tracking-wider drop-shadow-lg text-center">📓 Dream Planner</h1>

          <div className="flex flex-col gap-4 mb-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 text-2xl">⏰</span>
              <input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg rounded-2xl border border-pink-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white/80 w-full"
              />
            </div>
            <textarea
              placeholder="Write a lovely task ✨"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              rows={5}
              className="p-4 text-lg rounded-3xl border border-pink-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-fuchsia-300 bg-white/90 resize-none min-h-[120px]"
            />
            <button
              onClick={handleAddTask}
              className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-2 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              ➕ Add Task
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-rose-300">
            {(tasks[selectedDate] || []).map((task, i) => (
              <div
                key={i}
                className="relative pl-6 pr-4 py-2 bg-gradient-to-br from-pink-100 via-rose-200 to-pink-100 rounded-3xl shadow-lg border border-rose-300"
              >
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-pink-500 text-xl">⏰</span>
                <span className="block text-rose-700 font-medium tracking-wide whitespace-pre-wrap mb-1 ml-6">{task.text}</span>
                <span className="block bg-white text-rose-500 px-3 py-1 rounded-full text-sm shadow-sm border border-pink-200 w-fit ml-6">
                  {task.time}
                </span>
              </div>
            ))}
            {!(tasks[selectedDate] || []).length && (
              <p className="text-rose-400 italic text-center">Your page is empty... just sparkles ✨</p>
            )}
          </div>
        </div>

        {/* Right - Calendar */}
        <div className="p-4 sm:p-6 bg-[url('/notebook-right.png')] bg-cover bg-no-repeat bg-right rounded-b-[40px] lg:rounded-r-[40px] lg:rounded-bl-none overflow-y-auto">
          <h2 className="text-4xl font-bold text-pink-600 mb-4 text-center tracking-wider drop-shadow-sm">📅 Glitter Calendar</h2>
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {[...Array(leadingEmptyDays)].map((_, i) => (
              <div key={`empty-${i}`} className="" />
            ))}
            {daysInMonth.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const isSelected = selectedDate === dateStr;
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`py-2 px-1 sm:py-3 sm:px-2 rounded-xl transition text-xs sm:text-sm font-semibold border shadow border-pink-200 backdrop-blur-sm ${
                    isSelected
                      ? "bg-pink-500 text-white ring-2 ring-rose-400 scale-105"
                      : "bg-white/90 text-pink-700 hover:bg-pink-100"
                  }`}
                >
                  {format(day, "dd MMM")}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
