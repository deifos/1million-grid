import { useState, useEffect } from "react";
import { ExternalLink, Sun, Moon, Palette, X } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface Color {
  name: string;
  class: string;
}

interface Company {
  name: string;
  color: string;
  link: string;
}

const colors: Color[] = [
  { name: "Red", class: "bg-red-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Green", class: "bg-green-500" },
  { name: "Yellow", class: "bg-yellow-500" },
  { name: "Purple", class: "bg-purple-500" },
  { name: "Pink", class: "bg-pink-500" },
  { name: "Indigo", class: "bg-indigo-500" },
  { name: "Teal", class: "bg-teal-500" },
];
const radiusOptions: string[] = ["0", "0.3", "1"];

interface CustomizationPanelProps {
  onColorChange: (color: string) => void;
  onRadiusChange: (radius: string) => void;
  selectedColor: string;
  selectedRadius: string;
  onClose: () => void;
}

function CustomizationPanel({
  onColorChange,
  onRadiusChange,
  selectedColor,
  selectedRadius,
  onClose,
}: CustomizationPanelProps) {
  return (
    <div className="w-80 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Customize</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Pick a color and radius for new squares.
      </p>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 dark:text-white">Color</h3>
        <div className="max-w-[200px] mx-auto">
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                style={{ borderRadius: `0.3rem` }}
                key={color.name}
                className={`h-8 w-8 ${color.class} ${
                  selectedColor === color.name
                    ? "ring-2 ring-offset-2 ring-gray-500 dark:ring-gray-300"
                    : ""
                }`}
                onClick={() => onColorChange(color.name)}
                aria-label={color.name}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 dark:text-white">Radius</h3>
        <div className="flex space-x-2">
          {radiusOptions.map((radius) => (
            <button
              style={{ borderRadius: `0.3rem` }}
              key={radius}
              className={`px-3 py-1 text-sm ${
                selectedRadius === radius
                  ? "bg-gray-200 text-gray-800 border-2 border-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-200"
                  : "bg-gray-100 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              }`}
              onClick={() => onRadiusChange(radius)}
            >
              {radius}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const gridSize = 40; // 40x25 grid to make 1000 squares
  const squareSize = 13.5; // Size of each square in pixels
  const gapSize = 4; // Gap between squares in pixels

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showCustomization, setShowCustomization] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("Blue");
  const [selectedRadius, setSelectedRadius] = useState<string>("0.3");
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const goalDate = new Date(2030, 0, 1); // January 1st, 2030
      const timeDiff = goalDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const years = Math.floor(daysDiff / 365);
      const days = daysDiff % 365;
      setTimeRemaining(`${years} years, ${days} days`);
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 86400000); // Update every 24 hours

    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const companies: Company[] = [
    {
      name: "TechNova Solutions",
      color: "bg-purple-500",
      link: "https://x.com",
    },
    {
      name: "EcoSmart Innovations",
      color: "bg-green-500",
      link: "https://x.com",
    },
    { name: "QuantumLeap AI", color: "bg-blue-500", link: "https://x.com" },
    {
      name: "SolarFlare Energy",
      color: "bg-yellow-500",
      link: "https://x.com",
    },
    {
      name: "CyberShield Security",
      color: "bg-red-500",
      link: "https://x.com",
    },
  ];

  const getSelectedColorClass = (): string => {
    return colors.find((c) => c.name === selectedColor)?.class || "bg-blue-500";
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark" : ""
      } bg-white dark:bg-black transition-colors duration-200`}
    >
      {/* Navigation */}
      <nav className="bg-gray-100 dark:bg-gray-900 shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 ${getSelectedColorClass()} rounded-sm`}
            ></div>
            <span className="font-semibold text-gray-900 dark:text-white">
              My Name
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
            >
              <Palette className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
            <a
              href="https://github.com/deifos/1million-grid"
              target="_blank"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
            >
              <GitHubLogoIcon />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow relative">
        {/* Customization Panel */}
        {showCustomization && (
          <div className="absolute top-4 right-4 z-10">
            <CustomizationPanel
              onColorChange={setSelectedColor}
              onRadiusChange={setSelectedRadius}
              selectedColor={selectedColor}
              selectedRadius={selectedRadius}
              onClose={() => setShowCustomization(false)}
            />
          </div>
        )}

        {/* Grid Content */}
        <div className="flex items-center justify-center min-h-full">
          <main className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
              My{" "}
              <span
                className={`underline ${getSelectedColorClass()} text-white px-1 rounded`}
              >
                $1,000,000
              </span>{" "}
              Grid
            </h1>
            <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
              For the{" "}
              <span
                className={`${getSelectedColorClass()} text-white font-semibold px-1 rounded`}
              >
                One Million Dollar
              </span>{" "}
              challenge. Each square represents $1,000.
            </p>

            {/* Grid */}
            <div className="flex justify-center mb-6 overflow-x-auto">
              <div
                className="grid bg-gray-100 dark:bg-gray-900 p-2 rounded-lg"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, ${squareSize}px)`,
                  gap: `${gapSize}px`,
                  width: `${
                    gridSize * squareSize + (gridSize - 1) * gapSize + 16
                  }px`, // Account for gap and padding
                }}
              >
                {[...Array(1000)].map((_, index) => (
                  <a
                    key={index}
                    href={
                      index < companies.length ? companies[index].link : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    title={
                      index < companies.length
                        ? companies[index].name
                        : "Buy this spot"
                    }
                  >
                    <div
                      className={`w-[13.5px] h-[13.5px] ${
                        index < companies.length
                          ? companies[index].color
                          : "bg-white dark:bg-gray-800"
                      }`}
                      style={{ borderRadius: `${selectedRadius}rem` }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Time Information */}
            <div className="flex justify-center text-sm mb-8 text-gray-700 dark:text-gray-300">
              <p>Time Remaining: {timeRemaining}</p>
            </div>

            {/* Revenue Breakdown */}
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Revenue Breakdown
            </h2>
            <table className="w-full mb-8">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">
                    Category
                  </th>
                  <th className="text-right p-2 text-gray-700 dark:text-gray-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-300">
                    <td className="p-2 flex items-center">
                      <div
                        className={`w-4 h-4 ${company.color} mr-2`}
                        style={{ borderRadius: `${selectedRadius}rem` }}
                      ></div>
                      <a
                        href={company.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {company.name}
                      </a>
                      <a
                        href={company.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                      </a>
                    </td>
                    <td className="text-right p-2">${(index + 1) * 1000}</td>
                  </tr>
                ))}
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <td className="p-2">Total</td>
                  <td className="text-right p-2">
                    $
                    {companies.reduce(
                      (sum, _, index) => sum + (index + 1) * 1000,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer Note */}
            <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              P.S. Want your company to be part of internet history? Of course
              you do!
              <br />
              Grab your pixel before they're gone. Trust us, it's cooler than a
              Super Bowl ad.
              <br />
              <a
                href="#"
                className={`${getSelectedColorClass()} text-white hover:underline font-bold px-1 rounded`}
              >
                Secure your spot now
              </a>{" "}
              (before your competitors do)
            </p>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Built by{" "}
            <a
              href="https://x.com/deifosv"
              className="underline hover:text-gray-900 dark:hover:text-gray-200"
            >
              vlad
            </a>
          </p>
          <p>
            Inspired by this post from{" "}
            <a
              href="https://x.com/florinpop1705/status/1834645096567869538"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 dark:hover:text-gray-200"
            >
              @florinpop1705
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
