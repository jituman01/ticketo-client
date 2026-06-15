'use client';

import React from 'react';
import DashboardHeading from '@/components/DashboardHeading';
import {
  Card,
  CardHeader,
  Form,
  Input,
  TextArea,
  Button,
} from '@heroui/react';
import { useForm } from 'react-hook-form';

const AddEventPage = () => {
  const CATEGORIES = [
    'Music',
    'Tech',
    'Sports',
    'Arts',
    'Business',
    'Food',
    'Other',
  ];

  const LOCATIONS = [
    'New York',
    'San Francisco',
    'London',
    'Dhaka',
    'Tokyo',
    'Berlin',
    'Online',
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      banner: '',
      category: '',
      location: '',
      date: '',
      price: '',
      capacity: '',
      description: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // TODO: API Call

    reset();
  };

  return (
    <div>
      <DashboardHeading
        title="Add Event"
        description="Add new event"
      />

      <div className="mt-6 max-w-4xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">
              Host a New Event
            </h3>
            <p className="text-slate-400 text-sm">
              Fill out the detailed event information. Banners and dates are
              required.
            </p>
          </CardHeader>

          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              {/* Event Title & Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Event Title
                  </label>

                  <Input
                    className={'w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 outline-none hover:border-pink-500/50 focus:border-pink-500 text-sm'}
                    placeholder="e.g. Rock Fest 2026"
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                    {...register('title', {
                      required: 'Event title is required',
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Banner Image URL
                  </label>

                  <Input
                    className={'w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 outline-none hover:border-pink-500/50 focus:border-pink-500 text-sm'}
                    placeholder="https://images.unsplash.com/..."
                    isInvalid={!!errors.banner}
                    errorMessage={errors.banner?.message}
                    {...register('banner', {
                      required: 'Banner image is required',
                    })}
                  />
                </div>
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Category
                  </label>

                  <select
                    className="w-full h-11 bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 outline-none hover:border-pink-500/50 focus:border-pink-500 transition"
                    {...register('category', {
                      required: 'Category is required',
                    })}
                  >
                    <option value="">Select Category</option>

                    {CATEGORIES.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-slate-950"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="text-red-500 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Location
                  </label>

                  <select
                    className="w-full h-11 bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 outline-none hover:border-pink-500/50 focus:border-pink-500 transition"
                    {...register('location', {
                      required: 'Location is required',
                    })}
                  >
                    <option value="">Select Location</option>

                    {LOCATIONS.map((loc) => (
                      <option
                        key={loc}
                        value={loc}
                        className="bg-slate-950"
                      >
                        {loc}
                      </option>
                    ))}
                  </select>

                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date, Price, Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Event Date
                  </label>

                  <Input
                    type="date"
                    isInvalid={!!errors.date}
                    errorMessage={errors.date?.message}
                    {...register('date', {
                      required: 'Date is required',
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Ticket Price ($)
                  </label>

                  <Input
                    type="number"
                    placeholder="0.00"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                    {...register('price', {
                      required: 'Price is required',
                      min: {
                        value: 0,
                        message: 'Price cannot be negative',
                      },
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Available Capacity
                  </label>

                  <Input
                    type="number"
                    placeholder="100"
                    isInvalid={!!errors.capacity}
                    errorMessage={errors.capacity?.message}
                    {...register('capacity', {
                      required: 'Capacity is required',
                      min: {
                        value: 1,
                        message: 'Minimum 1 seat required',
                      },
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-slate-300">
                  Detailed Description
                </label>

                <TextArea
                  className={'w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 outline-none hover:border-pink-500/50 focus:border-pink-500 text-sm'}
                  minRows={5}
                  placeholder="Outline the detailed schedule, speaker list, amenities, speakers, and event highlights..."
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 20,
                      message:
                        'Description must be at least 20 characters',
                    },
                  })}
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  radius="lg"
                  className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-8 shadow-lg shadow-pink-500/10"
                >
                  Host Event Now
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddEventPage;