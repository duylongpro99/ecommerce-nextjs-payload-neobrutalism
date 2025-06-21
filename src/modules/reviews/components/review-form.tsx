"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ReviewsGetOneOutput } from "../type";
import { StarPicker } from "@/components/star-picker";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  productId: string;
  intialData?: ReviewsGetOneOutput | null;
}

const formSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }).max(5),
  description: z.string().min(1, { message: "Description is required" }),
});

export const ReviewForm: React.FC<Props> = ({ productId, intialData }) => {
  const [isPreview, setIsPreview] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createReview = useMutation(
    trpc.reviews.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({
            productId,
          }),
        );

        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const updateReview = useMutation(
    trpc.reviews.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({
            productId,
          }),
        );

        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: intialData?.ratings ?? 0,
      description: intialData?.description ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (intialData) {
      updateReview.mutate({
        reviewId: intialData.id,
        rating: values.rating,
        description: values.description,
      });
    } else {
      createReview.mutate({
        productId,
        rating: values.rating,
        description: values.description,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="font-medium">
          {isPreview ? "Your rating:" : "Liked it? Give it a rating"}
        </p>

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <StarPicker
                    value={field.value}
                    onChange={field.onChange}
                    disable={isPreview}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Leave your review..."
                    disabled={isPreview}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        {!isPreview && (
          <Button
            variant="elevated"
            disabled={createReview.isPending || updateReview.isPending}
            type="submit"
            size="lg"
            className="bg-black text-white hover:bg-cyan-400 hover:text-primary w-fit"
          >
            {intialData ? "Update review" : "Post review"}
          </Button>
        )}

        {isPreview && (
          <Button
            variant="elevated"
            size="lg"
            className="w-fit mt-4"
            type="button"
            onClick={() => setIsPreview(false)}
          >
            Edit
          </Button>
        )}
      </form>
    </Form>
  );
};

export const ReviewFormSekeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-medium">Liked it? Give it a rating</p>

      <StarPicker disable />

      <Textarea placeholder="Leave your review..." disabled />

      <Button
        variant="elevated"
        type="button"
        size="lg"
        className="bg-black text-white hover:bg-cyan-400 hover:text-primary w-fit"
      >
        Post review
      </Button>
    </div>
  );
};
