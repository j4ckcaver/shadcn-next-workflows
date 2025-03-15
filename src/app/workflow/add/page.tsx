"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import { PlusCircle, X, ArrowRight, ArrowLeft, Save, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TypeScript için gerekli tip tanımlamaları
type RetryPolicy = {
  maxAttempts: number;
  backoffMultiplier: number;
};

type FrequencySettings = {
  time: string;
  days: string[];
};

type Permissions = {
  viewUsers: string[];
  editUsers: string[];
};

type FormDataType = {
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  priority: 'low' | 'medium' | 'high';
  frequency: 'once' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  frequencySettings: FrequencySettings;
  timeout: number;
  retryPolicy: RetryPolicy;
  permissions: Permissions;
};

const WorkflowAdd: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    status: "active",
    priority: "medium",
    frequency: "daily",
    frequencySettings: {
      time: "10:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
    timeout: 600000,
    retryPolicy: {
      maxAttempts: 3,
      backoffMultiplier: 1.5,
    },
    permissions: {
      viewUsers: [],
      editUsers: [],
    },
  });

  const [newViewUser, setNewViewUser] = useState<string>("");
  const [newEditUser, setNewEditUser] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Utility functions for custom calendar
  const getWeekdayName = (dayNumber: number): string => {
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return weekdays[dayNumber];
  };
  
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    category: string,
    key: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof FormDataType],
        [key]: value,
      },
    }));
  };

  const handleDaysChange = (day: string) => {
    const days = [...formData.frequencySettings.days];
    if (days.includes(day)) {
      const index = days.indexOf(day);
      days.splice(index, 1);
    } else {
      days.push(day);
    }

    setFormData((prev) => ({
      ...prev,
      frequencySettings: {
        ...prev.frequencySettings,
        days,
      },
    }));
  };

  const addUser = (type: 'viewUsers' | 'editUsers', email: string) => {
    if (email && !formData.permissions[type].includes(email)) {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [type]: [...prev.permissions[type], email],
        },
      }));
      
      if (type === "viewUsers") {
        setNewViewUser("");
      } else {
        setNewEditUser("");
      }
    }
  };

  const removeUser = (type: 'viewUsers' | 'editUsers', email: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [type]: prev.permissions[type].filter((u) => u !== email),
      },
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would handle the submission to your API
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 shadow-sm border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-medium">Add New Workflow</CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400">
          Create a new automated workflow in 5 simple steps
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Progress Steps with Icons */}
        <div className="mb-10">
          <div className="relative flex justify-between mb-6">
            {[
              { step: 1, title: "Basics", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
              )},
              { step: 2, title: "Schedule", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              )},
              { step: 3, title: "Settings", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              )},
              { step: 4, title: "Permissions", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 11h.01"/>
                  <path d="M21 5H3v14h10"/>
                  <path d="M14 17a3 3 0 0 1 6 0v3h-6v-3z"/>
                  <path d="M6 9h12"/>
                </svg>
              )},
              { step: 5, title: "Review", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              )}
            ].map(({ step, title, icon }) => (
              <div key={step} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors
                    ${
                      currentStep === step
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : currentStep > step
                        ? "bg-green-500 text-white"
                        : "bg-white border-2 border-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700"
                    }`}
                >
                  {currentStep > step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    icon
                  )}
                </div>
                <span 
                  className={`text-sm ${
                    currentStep === step 
                      ? "font-medium text-blue-600 dark:text-blue-400" 
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {title}
                </span>
              </div>
            ))}
            
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-zinc-200 dark:bg-zinc-700" style={{ transform: "translateY(-50%)" }}></div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Basic Information</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Enter the fundamental details about your workflow.
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">Workflow Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Email Marketing Automation"
                    required
                    className="mt-1 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-zinc-800 dark:focus:ring-zinc-300"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-zinc-700 dark:text-zinc-300">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Send personalized emails based on customer activity"
                    rows={3}
                    className="mt-1 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-zinc-800 dark:focus:ring-zinc-300"
                  />
                </div>

                <div>
                  <Label htmlFor="status" className="text-zinc-700 dark:text-zinc-300">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full mt-1 py-2 px-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-800 dark:focus:ring-zinc-300"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Schedule</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Define when your workflow should run.
              </p>

              <div className="space-y-5">
              <div>
                  <Label htmlFor="frequency" className="text-zinc-700 dark:text-zinc-300">Frequency</Label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full mt-1 py-2 px-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                    hidden
                  >
                    <option value="once">Once</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="time" className="text-zinc-700 dark:text-zinc-300">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.frequencySettings.time}
                    onChange={(e) =>
                      handleNestedChange(
                        "frequencySettings",
                        "time",
                        e.target.value
                      )
                    }
                    className="mt-1 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                    hidden
                  />
                </div>
                
                {/* Enhanced Calendar with Integrated Frequency */}
                <div className="mt-4">
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-800">
                    {/* Frequency Selection Header */}
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                      <Label htmlFor="frequency" className="text-zinc-700 dark:text-zinc-300 font-medium block mb-2">
                        Execution Frequency
                      </Label>
                      
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { value: "once", label: "Once", description: "Run one time only" },
                          { value: "daily", label: "Daily", description: "Run every day" },
                          { value: "weekly", label: "Weekly", description: "Run on specific days of week" },
                          { value: "monthly", label: "Monthly", description: "Run on specific days of month" },
                          { value: "hourly", label: "Hourly", description: "Run every hour" }
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                frequency: option.value as 'once' | 'hourly' | 'daily' | 'weekly' | 'monthly'
                              }))
                            }}
                            className={`p-3 flex flex-col items-center justify-center rounded-md border transition-colors
                              ${formData.frequency === option.value
                                ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/40'
                                : 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                              }`}
                          >
                            <span className={`text-sm font-medium mb-1 ${formData.frequency === option.value ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                              {option.label}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                              {option.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Frequency-specific settings */}
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                      <div className="flex justify-between items-center mb-3">
                        <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
                          {formData.frequency === "once" && "Execution Date & Time"}
                          {formData.frequency === "daily" && "Execution Time"}
                          {formData.frequency === "weekly" && "Execution Days & Time"}
                          {formData.frequency === "monthly" && "Execution Days & Time"}
                          {formData.frequency === "hourly" && "Execution Minutes"}
                        </Label>
                        
                        {/* Show current selection summary */}
                        <div className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {formData.frequency === "once" && "Runs once at specified time"}
                          {formData.frequency === "daily" && `Runs daily at ${formData.frequencySettings.time}`}
                          {formData.frequency === "weekly" && `Runs weekly on ${formData.frequencySettings.days.length} days`}
                          {formData.frequency === "monthly" && "Runs monthly on selected dates"}
                          {formData.frequency === "hourly" && `Runs hourly at ${formData.frequencySettings.time.split(':')[1]} minutes past`}
                        </div>
                      </div>
                      
                      {/* Time input for all frequencies */}
                      {formData.frequency !== "hourly" && (
                        <div className="mb-4 flex items-center">
                          <div className="mr-2">
                            <Label htmlFor="time" className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">
                              Time
                            </Label>
                            <Input
                              id="time"
                              type="time"
                              value={formData.frequencySettings.time}
                              onChange={(e) =>
                                handleNestedChange(
                                  "frequencySettings",
                                  "time",
                                  e.target.value
                                )
                              }
                              className="w-32 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                          </div>
                          
                          {formData.frequency === "once" && (
                            <div>
                              <Label htmlFor="executionDate" className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">
                                Date
                              </Label>
                              <Input
                                id="executionDate"
                                type="date"
                                className="w-40 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                              />
                            </div>
                          )}
                          
                          {formData.frequency === "hourly" && (
                            <div>
                              <Label htmlFor="executionMinute" className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">
                                Minute
                              </Label>
                              <select
                                id="executionMinute"
                                className="w-24 h-10 px-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="0">:00</option>
                                <option value="15">:15</option>
                                <option value="30">:30</option>
                                <option value="45">:45</option>
                              </select>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Frequency-specific extra inputs */}
                      {formData.frequency === "hourly" && (
                        <div className="flex flex-col gap-2">
                          <Label className="text-xs text-zinc-500 dark:text-zinc-400">Run every hour at minute:</Label>
                          <div className="flex flex-wrap gap-2">
                            {[0, 15, 30, 45].map(minute => (
                              <button
                                key={minute}
                                type="button"
                                className={`px-3 py-1.5 text-sm rounded-md border 
                                  ${minute === parseInt(formData.frequencySettings.time.split(':')[1] || '0')
                                    ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/50 dark:border-blue-600 dark:text-blue-300'
                                    : 'bg-white border-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300'
                                  }`}
                                onClick={() => {
                                  const hour = formData.frequencySettings.time.split(':')[0] || '00';
                                  handleNestedChange(
                                    "frequencySettings",
                                    "time",
                                    `${hour}:${minute.toString().padStart(2, '0')}`
                                  );
                                }}
                              >
                                :{minute.toString().padStart(2, '0')}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Calendar section only showing for weekly and monthly frequencies */}
                    {(formData.frequency === "weekly" || formData.frequency === "monthly") && (
                      <>
                        {/* Calendar Header */}
                        <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-700">
                          <button 
                            type="button" 
                            onClick={prevMonth}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 text-blue-500 dark:text-blue-400"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-base">
                            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                          </h3>
                          
                          <button 
                            type="button" 
                            onClick={nextMonth}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 text-blue-500 dark:text-blue-400"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                        
                        {/* Info message based on frequency */}
                        <div className="p-3 text-xs text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border-b border-zinc-200 dark:border-zinc-700">
                          {formData.frequency === "weekly" && "Select days to add that weekday to your recurring schedule. Each click toggles the entire weekday."}
                          {formData.frequency === "monthly" && "Select dates to add those days of the month to your schedule (e.g., 1st, 15th of each month)."}
                        </div>
                        
                        {/* Calendar Grid */}
                        <div className="p-3">
                          {/* Day Headers */}
                          <div className="grid grid-cols-7 gap-2 mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                              <div key={i} className="h-8 flex items-center justify-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                                {day}
                              </div>
                            ))}
                          </div>
                          
                          {/* Calendar Days */}
                          <div className="grid grid-cols-7 gap-2">
                            {/* Empty cells for days before first day of month */}
                            {Array.from({ length: getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }, (_, i) => (
                              <div key={`empty-${i}`} className="h-10" />
                            ))}
                            
                            {/* Actual days in month */}
                            {Array.from(
                              { length: getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }, 
                              (_, i) => i + 1
                            ).map((day) => {
                              // Create date object for this day
                              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                              const dayOfWeek = date.getDay(); // 0-6 (Sunday-Saturday)
                              const weekdayName = getWeekdayName(dayOfWeek);
                              
                              // Check if selected based on frequency
                              let isSelected = false;
                              if (formData.frequency === "weekly") {
                                isSelected = formData.frequencySettings.days.includes(weekdayName);
                              } else if (formData.frequency === "monthly") {
                                // For monthly, we would check if this day number is in the selected days
                                // For now, let's just reuse the days array to store day numbers instead of weekdays
                                isSelected = formData.frequencySettings.days.includes(day.toString());
                              }
                              
                              const isToday = new Date().toDateString() === date.toDateString();
                              
                              // Generate different style based on selection and weekday
                              let dayStyle = "border border-zinc-200 dark:border-zinc-700 ";
                              
                              // If selected
                              if (isSelected) {
                                dayStyle += "bg-blue-100 text-blue-700 font-medium border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800 ";
                              } else {
                                dayStyle += "text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-700 ";
                              }
                              
                              // Today
                              if (isToday) {
                                dayStyle += "ring-2 ring-blue-500 dark:ring-blue-400 ";
                              }
                              
                              // Weekend
                              if ([0, 6].includes(dayOfWeek) && !isSelected) {
                                dayStyle += "text-red-500 dark:text-red-400 ";
                              }
                              
                              return (
                                <button
                                  key={`day-${day}`}
                                  type="button"
                                  onClick={() => {
                                    if (formData.frequency === "weekly") {
                                      handleDaysChange(weekdayName);
                                    } else if (formData.frequency === "monthly") {
                                      // For monthly, toggle the day number
                                      const days = [...formData.frequencySettings.days];
                                      const dayStr = day.toString();
                                      if (days.includes(dayStr)) {
                                        const index = days.indexOf(dayStr);
                                        days.splice(index, 1);
                                      } else {
                                        days.push(dayStr);
                                      }
                                      setFormData((prev) => ({
                                        ...prev,
                                        frequencySettings: {
                                          ...prev.frequencySettings,
                                          days,
                                        },
                                      }));
                                    }
                                  }}
                                  className={`h-10 rounded-md flex flex-col items-center justify-center text-sm ${dayStyle}`}
                                  title={
                                    formData.frequency === "weekly"
                                      ? `Select all ${weekdayName}s`
                                      : `Select day ${day} of each month`
                                  }
                                >
                                  <span>{day}</span>
                                  {isSelected && <span className="w-1.5 h-1.5 mt-0.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Quick Selection Section */}
                        <div className="p-3 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                          <div className="flex justify-between mb-2">
                            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Quick Select:</p>
                            <button 
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                frequencySettings: {
                                  ...prev.frequencySettings,
                                  days: []
                                }
                              }))}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Clear All
                            </button>
                          </div>
                          
                          {formData.frequency === "weekly" && (
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  frequencySettings: {
                                    ...prev.frequencySettings,
                                    days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
                                  }
                                }))}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                Weekdays
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  frequencySettings: {
                                    ...prev.frequencySettings,
                                    days: ["saturday", "sunday"]
                                  }
                                }))}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                Weekends
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  frequencySettings: {
                                    ...prev.frequencySettings,
                                    days: ["monday", "wednesday", "friday"]
                                  }
                                }))}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                M/W/F
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  frequencySettings: {
                                    ...prev.frequencySettings,
                                    days: ["tuesday", "thursday"]
                                  }
                                }))}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                Tu/Th
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  frequencySettings: {
                                    ...prev.frequencySettings,
                                    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
                                  }
                                }))}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                Every Day
                              </button>
                            </div>
                          )}
                          
                          {formData.frequency === "monthly" && (
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  frequencySettings: {
                                    ...prev.frequencySettings,
                                    days: ["1", "15"]
                                  }
                                }))}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                1st & 15th
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const lastDay = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
                                  setFormData(prev => ({
                                    ...prev,
                                    frequencySettings: {
                                      ...prev.frequencySettings,
                                      days: [lastDay.toString()]
                                    }
                                  }));
                                }}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                Last Day
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  frequencySettings: {
                                    ...prev.frequencySettings,
                                    days: ["1"]
                                  }
                                }))}
                                className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                First Day
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* Selected Days/Dates Tags */}
                        <div className="p-3 border-t border-zinc-200 dark:border-zinc-700">
                          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                            {formData.frequency === "weekly" ? "Selected days:" : "Selected dates:"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {formData.frequencySettings.days.length > 0 ? (
                              formData.frequencySettings.days.map((day) => (
                                <Badge 
                                  key={day}
                                  className="bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 py-1.5 px-3 flex items-center"
                                >
                                  {formData.frequency === "weekly" 
                                    ? day.charAt(0).toUpperCase() + day.slice(1)
                                    : `Day ${day}`
                                  }
                                  <button 
                                    type="button" 
                                    className="ml-2 hover:text-blue-800 dark:hover:text-blue-200"
                                    onClick={() => {
                                      if (formData.frequency === "weekly") {
                                        handleDaysChange(day);
                                      } else {
                                        // Handle monthly day removal
                                        const days = [...formData.frequencySettings.days];
                                        const index = days.indexOf(day);
                                        if (index !== -1) {
                                          days.splice(index, 1);
                                          setFormData(prev => ({
                                            ...prev,
                                            frequencySettings: {
                                              ...prev.frequencySettings,
                                              days
                                            }
                                          }));
                                        }
                                      }
                                    }}
                                  >
                                    <X size={14} />
                                  </button>
                                </Badge>
                              ))
                            ) : (
                              <p className="text-sm text-zinc-500 dark:text-zinc-400 py-2">
                                {formData.frequency === "weekly"
                                  ? "No days selected"
                                  : "No dates selected"
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Existing Schedules */}
                <div>
                  <Label className="text-zinc-700 dark:text-zinc-300 mb-2 block">Existing Schedules</Label>
                  <div className="space-y-2">
                    <div className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Daily Reports</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Every weekday at 09:00</p>
                      </div>
                    </div>
                    <div className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Weekly Analytics</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Every Sunday at 18:00</p>
                      </div>
                    </div>
                    <div className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Data Backup</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Monthly on the 1st at 02:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Advanced Settings */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Advanced Settings</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Configure technical aspects of your workflow to control its execution behavior.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    These settings define how your workflow runs and handles errors. If you're unsure, leave the default values.
                  </p>
                </div>
                
                <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-white dark:bg-zinc-800">
                    <div className="flex items-start mb-3">
                      <div className="mr-3 mt-1 w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 16v-4"></path><path d="M12 8h.01"></path><circle cx="12" cy="12" r="10"></circle>
                        </svg>
                      </div>
                      <div>
                        <Label htmlFor="priority" className="text-zinc-900 dark:text-zinc-100 font-medium">Priority Level</Label>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                          Determines how this workflow is prioritized when multiple workflows run simultaneously
                        </p>
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="w-full py-2 px-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                        >
                          <option value="low">Low - Run when resources are available</option>
                          <option value="medium">Medium - Standard priority</option>
                          <option value="high">High - Run before other workflows</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-800">
                    <div className="flex items-start mb-3">
                      <div className="mr-3 mt-1 w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div>
                        <Label htmlFor="timeout" className="text-zinc-900 dark:text-zinc-100 font-medium">Execution Timeout</Label>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                          Maximum time (in milliseconds) the workflow can run before being terminated
                        </p>
                        <div className="flex items-center">
                          <Input
                            id="timeout"
                            type="number"
                            name="timeout"
                            value={formData.timeout}
                            onChange={handleChange}
                            placeholder="600000"
                            className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                          />
                          <div className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">
                            {(formData.timeout / 1000).toFixed(0)} seconds
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-800">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 8v5H3V8"></path><path d="M7 3h10"></path><path d="M7 21h10"></path><path d="M17 5l-5 4-5-4"></path><path d="M17 19l-5-4-5 4"></path>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-zinc-900 dark:text-zinc-100 font-medium">Error Handling</h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                              Configure how the system handles errors that occur during workflow execution
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <Label htmlFor="maxAttempts" className="text-sm text-zinc-700 dark:text-zinc-300">
                              Retry Attempts
                            </Label>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                              How many times to retry before failing
                            </p>
                            <Input
                              id="maxAttempts"
                              type="number"
                              min="0"
                              max="10"
                              value={formData.retryPolicy.maxAttempts}
                              onChange={(e) =>
                                handleNestedChange(
                                  "retryPolicy",
                                  "maxAttempts",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="3"
                              className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="backoffMultiplier" className="text-sm text-zinc-700 dark:text-zinc-300">
                              Backoff Multiplier
                            </Label>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                              Time increase factor between retries
                            </p>
                            <Input
                              id="backoffMultiplier"
                              type="number"
                              step="0.1"
                              min="1"
                              max="5"
                              value={formData.retryPolicy.backoffMultiplier}
                              onChange={(e) =>
                                handleNestedChange(
                                  "retryPolicy",
                                  "backoffMultiplier",
                                  parseFloat(e.target.value)
                                )
                              }
                              placeholder="1.5"
                              className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Permissions */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Permissions</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Control who can access and modify this workflow.
              </p>

              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                {/* Email Input Section */}
                <div className="p-4">
                  <Label className="text-zinc-900 dark:text-zinc-100 font-medium mb-2 block">
                    Add Users
                  </Label>
                  
                  <div className="flex mb-2">
                    <Input
                      type="email"
                      value={newEditUser}
                      onChange={(e) => setNewEditUser(e.target.value)}
                      className="rounded-r-none bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="email@company.com"
                    />
                    <div className="flex">
                      <Button
                        type="button"
                        onClick={() => {
                          if (newEditUser) {
                            addUser("viewUsers", newEditUser);
                            addUser("editUsers", newEditUser);
                          }
                        }}
                        className="rounded-l-none rounded-r-none bg-blue-500 hover:bg-blue-600 text-white px-3"
                        title="Add with both permissions"
                      >
                        <PlusCircle size={18} className="mr-1" /> All
                      </Button>
                      <div className="flex border-l border-blue-600">
                        <Button
                          type="button"
                          onClick={() => newEditUser && addUser("viewUsers", newEditUser)}
                          className="rounded-none bg-blue-500 hover:bg-blue-600 text-white px-3"
                          title="Add with view permission only"
                        >
                          View
                        </Button>
                        <Button
                          type="button"
                          onClick={() => newEditUser && addUser("editUsers", newEditUser)}
                          className="rounded-l-none bg-blue-500 hover:bg-blue-600 text-white px-3"
                          title="Add with edit permission only"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Add users with specific or both permissions in one go
                  </p>
                </div>
                
                {/* Permissions Management Section */}
                <div className="border-t border-zinc-200 dark:border-zinc-700">
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">User Permissions</h4>
                    
                    {/* Combined user list with permission toggles */}
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {/* Get unique users from both lists */}
                      {Array.from(new Set([...formData.permissions.viewUsers, ...formData.permissions.editUsers])).map((user) => {
                        const hasView = formData.permissions.viewUsers.includes(user);
                        const hasEdit = formData.permissions.editUsers.includes(user);
                        
                        return (
                          <div key={user} className="flex items-center justify-between p-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800">
                            <div className="flex-grow mr-4">
                              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{user}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div 
                                className={`flex items-center px-2 py-1 rounded ${hasView ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-700'}`}
                                onClick={() => {
                                  if (hasView) {
                                    removeUser("viewUsers", user);
                                  } else {
                                    addUser("viewUsers", user);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                <span className="text-xs font-medium">View</span>
                                {hasView && <span className="ml-1 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>}
                              </div>
                              
                              <div 
                                className={`flex items-center px-2 py-1 rounded ${hasEdit ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-700'}`}
                                onClick={() => {
                                  if (hasEdit) {
                                    removeUser("editUsers", user);
                                  } else {
                                    addUser("editUsers", user);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                <span className="text-xs font-medium">Edit</span>
                                {hasEdit && <span className="ml-1 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>}
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => {
                                  removeUser("viewUsers", user);
                                  removeUser("editUsers", user);
                                }}
                                className="p-1 rounded-full text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      
                      {formData.permissions.viewUsers.length === 0 && formData.permissions.editUsers.length === 0 && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 py-2 text-center">
                          No users added yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Summary Section */}
                <div className="border-t border-zinc-200 dark:border-zinc-700 p-4 bg-zinc-50 dark:bg-zinc-900">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        View Access: <span className="font-medium text-zinc-700 dark:text-zinc-300">{formData.permissions.viewUsers.length} users</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Edit Access: <span className="font-medium text-zinc-700 dark:text-zinc-300">{formData.permissions.editUsers.length} users</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Review & Submit</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Review your workflow configuration before finalizing it.
              </p>

              <div className="space-y-5 border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 bg-white dark:bg-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                      Basic Information
                    </h4>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {formData.name || "Unnamed Workflow"}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {formData.description || "No description provided"}
                    </p>
                    <p className="mt-2 text-xs px-2 py-1 inline-block rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                      Status:{" "}
                      <span className="font-medium capitalize">
                        {formData.status}
                      </span>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                      Schedule
                    </h4>
                    <p className="capitalize text-zinc-900 dark:text-zinc-100">{formData.frequency}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {formData.frequency !== "once" &&
                        `at ${formData.frequencySettings.time}`}
                    </p>
                    {formData.frequency === "weekly" && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {formData.frequencySettings.days.map((day) => (
                          <span
                            key={day}
                            className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 capitalize"
                          >
                            {day.substring(0, 3)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-700">
                  <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Advanced Settings
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                      Priority:{" "}
                      <span className="font-medium capitalize">
                        {formData.priority}
                      </span>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                      Timeout:{" "}
                      <span className="font-medium">
                        {formData.timeout}ms
                      </span>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                      Max Retries:{" "}
                      <span className="font-medium">
                        {formData.retryPolicy.maxAttempts}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-700">
                  <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Permissions
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        View Access ({formData.permissions.viewUsers.length})
                      </h5>
                      {formData.permissions.viewUsers.length > 0 ? (
                        <div className="space-y-1">
                          {formData.permissions.viewUsers.map((user) => (
                            <div
                              key={user}
                              className="text-sm text-zinc-600 dark:text-zinc-400"
                            >
                              {user}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-zinc-500 dark:text-zinc-500">
                          No view access users defined
                        </p>
                      )}
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Edit Access ({formData.permissions.editUsers.length})
                      </h5>
                      {formData.permissions.editUsers.length > 0 ? (
                        <div className="space-y-1">
                          {formData.permissions.editUsers.map((user) => (
                            <div
                              key={user}
                              className="text-sm text-zinc-600 dark:text-zinc-400"
                            >
                              {user}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-zinc-500 dark:text-zinc-500">
                          No edit access users defined
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between pt-2 pb-6 px-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          <ArrowLeft size={16} className="mr-2" /> Previous
        </Button>

        {currentStep < 5 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            Next <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            <Save size={16} className="mr-2" /> Save Workflow
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkflowAdd;