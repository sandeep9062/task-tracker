"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Plus,
  Trash2,
  Search,
  Filter,
  User,
  Sparkles,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  Task,
} from "@/services/taskApi";
import { useGetUserInfoQuery } from "@/services/userApi";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserInfoQuery({});

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState<"pending" | "completed">(
    "pending"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "completed"
  >("all");

  const handleAddTask = async () => {
    if (!newTaskName.trim()) return;

    try {
      const newTask = await addTask({
        name: newTaskName.trim(),
        status: newTaskStatus,
      }).unwrap();
      setNewTaskName("");
      setNewTaskStatus("pending");
      toast.success(`✨ Task "${newTask.name}" added!`);
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const taskToDelete = tasks.find((task) => task._id === id);
      await deleteTask(id).unwrap();
      toast.success(`🗑️ Task "${taskToDelete?.name}" deleted.`);
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  const handleToggleTaskStatus = async (task: Task) => {
    try {
      await updateTask({
        id: task._id,
        data: {
          status: task.status === "pending" ? "completed" : "pending",
        },
      }).unwrap();
    } catch (error) {
      toast.error("Failed to update task status.");
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => filterStatus === "all" || task.status === filterStatus);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#EF7722] to-[#FAA533] rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-gray-950" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
          </div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="shadow-lg cursor-pointer">
                  <AvatarFallback className="bg-[#EF7722]/10 text-[#EF7722] font-semibold">
                    {user ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back{user ? `, ${user.name}` : ""}! 👋
          </h2>
          <p className="text-gray-600">Ready to tackle your tasks today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          <Card className="bg-white/50 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Tasks
              </CardTitle>
              <ListTodo className="h-4 w-4 text-[#EF7722]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
              <p className="text-xs text-gray-600">Your productivity journey</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Tasks
              </CardTitle>
              <Clock className="h-4 w-4 text-[#FAA533]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.pending}
              </div>
              <p className="text-xs text-gray-600">Ready to be completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed Tasks
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-[#0BA6DF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.completed}
              </div>
              <p className="text-xs text-gray-600">Great job! 🎉</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Task */}
        <Card className="bg-white/50 shadow-lg border border-gray-200/50 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#0BA6DF]" />
              <span>Add New Task</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="What do you want to accomplish?"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                className="flex-1 h-12 bg-gray-100/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-[#EF7722]/50"
              />
              <Select
                value={newTaskStatus}
                onValueChange={(value: "pending" | "completed") =>
                  setNewTaskStatus(value)
                }
              >
                <SelectTrigger className="w-full sm:w-48 h-12 bg-gray-100/50 border-gray-200/50 text-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddTask}
                className="h-12 px-8 bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-gray-950 hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-gray-100/50 border-gray-200/50 text-gray-900 placeholder-gray-500"
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(value: "all" | "pending" | "completed") =>
              setFilterStatus(value)
            }
          >
            <SelectTrigger className="w-full sm:w-48 h-12 flex items-center gap-2 bg-gray-100/50 border-gray-200/50 text-gray-600">
              <Filter className="w-4 h-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tasks List */}
        <div className="space-y-4 animate-fade-in-up">
          {isLoading ? (
            <Card className="bg-white/50 shadow-lg border border-dashed border-gray-200/50">
              <CardContent className="py-12 text-center">
                <p>Loading tasks...</p>
              </CardContent>
            </Card>
          ) : isError ? (
            <Card className="bg-white/50 shadow-lg border border-dashed border-gray-200/50">
              <CardContent className="py-12 text-center">
                <p className="text-red-500">Failed to load tasks.</p>
              </CardContent>
            </Card>
          ) : filteredTasks.length === 0 ? (
            <Card className="bg-white/50 shadow-lg border border-dashed border-gray-200/50">
              <CardContent className="py-12 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100/50 rounded-full flex items-center justify-center mb-4">
                  <ListTodo className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm || filterStatus !== "all"
                    ? "No matching tasks"
                    : "No tasks yet — let's get productive!"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter."
                    : "Add your first task above to start organizing your day."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card
                key={task._id}
                className="bg-white/50 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] group"
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <button onClick={() => handleToggleTaskStatus(task)}>
                      {task.status === "completed" ? (
                        <CheckCircle2 className="w-6 h-6 text-[#0BA6DF] hover:scale-110 transition-transform" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-600 rounded-full hover:border-[#EF7722] transition-colors" />
                      )}
                    </button>

                    <h3
                      className={`font-medium ${
                        task.status === "completed"
                          ? "text-gray-600 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {task.name}
                    </h3>

                    <Badge
                      variant={
                        task.status === "completed" ? "secondary" : "outline"
                      }
                      className={`${
                        task.status === "completed"
                          ? "bg-[#0BA6DF]/20 text-[#0BA6DF] border-[#0BA6DF]/20"
                          : "bg-[#FAA533]/20 text-[#FAA533] border-[#FAA533]/20"
                      }`}
                    >
                      {task.status === "completed" ? "Completed" : "Pending"}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task._id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
