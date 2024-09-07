import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const toDoData = [
  {
    id: 1,
    title: "Design Roadmap Page",
    description:
      "Sketch and design the layout for the upcoming Roadmap page on TheDevStarter website.",
  },
  {
    id: 2,
    title: "Implement Roadmap UI",
    description:
      "Code the frontend of the Roadmap page, ensuring it aligns with the overall design and theme of TheDevStarter.",
  },
  {
    id: 3,
    title: "Integrate Dynamic Data",
    description:
      "Implement functionality to dynamically populate the Roadmap page with real-time data, ensuring accuracy and relevance.",
  },
  {
    id: 4,
    title: "Test Roadmap Page",
    description:
      "Conduct thorough testing of the Roadmap page to identify and fix any bugs or issues, ensuring a smooth user experience.",
  },
  {
    id: 5,
    title: "Update Documentation",
    description:
      "Update the documentation to include details about the newly added Roadmap page, providing users with comprehensive information.",
  },
  {
    id: 6,
    title: "Deploy Changes",
    description:
      "Deploy the updated version of TheDevStarter website, including the newly added Roadmap page, to make it accessible to users.",
  },
];

const inProgressData = [
  {
    id: 1,
    title: "Implement Roadmap UI",
    description:
      "Currently working on coding the frontend of the Roadmap page, ensuring it aligns with the overall design and theme of TheDevStarter.",
  },
  {
    id: 2,
    title: "Integrate Dynamic Data",
    description:
      "In the process of implementing functionality to dynamically populate the Roadmap page with real-time data, ensuring accuracy and relevance.",
  },
  {
    id: 3,
    title: "Test Roadmap Page",
    description:
      "Currently conducting thorough testing of the Roadmap page to identify and fix any bugs or issues, ensuring a smooth user experience.",
  },
  {
    id: 4,
    title: "Update Documentation",
    description:
      "Currently updating the documentation to include details about the newly added Roadmap page, providing users with comprehensive information.",
  },
];

const doneData = [
  {
    id: 1,
    title: "Design Roadmap Page",
    description:
      "Successfully designed the layout for the Roadmap page on TheDevStarter website.",
  },
  {
    id: 2,
    title: "Implement Roadmap UI",
    description:
      "Completed coding the frontend of the Roadmap page, ensuring it aligns with the overall design and theme of TheDevStarter.",
  },
  {
    id: 3,
    title: "Integrate Dynamic Data",
    description:
      "Implemented functionality to dynamically populate the Roadmap page with real-time data, ensuring accuracy and relevance.",
  },
  {
    id: 4,
    title: "Test Roadmap Page",
    description:
      "Conducted thorough testing of the Roadmap page, identifying and fixing any bugs or issues for a smooth user experience.",
  },
  {
    id: 5,
    title: "Update Documentation",
    description:
      "Successfully updated the documentation to include details about the newly added Roadmap page, providing users with comprehensive information.",
  },
];

export default function Roadmap() {
  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 dark:text-gray-100 max-w-7xl mx-auto py-20 px-6">
  <Card className="space-y-3 rounded-lg bg-gray-200/75 p-3.5 dark:bg-gray-700/75">
    <CardHeader className="flex items-center justify-between">
      <CardTitle className="font-semibold">To-Do</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {toDoData.map((item, index) => (
        <Card key={index} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
          <CardHeader className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
            <CardTitle className="font-medium">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="grow p-5">
            <p>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </CardContent>
  </Card>
  
  <Card className="space-y-3 rounded-lg bg-gray-200/75 p-3.5 dark:bg-gray-700/75">
    <CardHeader className="flex items-center justify-between">
      <CardTitle className="font-semibold">In Progress</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {inProgressData.map((item, index) => (
        <Card key={index} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
          <CardHeader className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
            <CardTitle className="font-medium">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="grow p-5">
            <p>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </CardContent>
  </Card>

  <Card className="space-y-3 rounded-lg bg-gray-200/75 p-3.5 dark:bg-gray-700/75">
    <CardHeader className="flex items-center justify-between">
      <CardTitle className="font-semibold">Completed</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {doneData.map((item, index) => (
        <Card key={index} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
          <CardHeader className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
            <CardTitle className="font-medium">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="grow p-5">
            <p>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </CardContent>
  </Card>
</div>

    </>
  );
}
