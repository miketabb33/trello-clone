class TaskController < ApplicationController
  def index
    render json: { status: "status" }, status: :ok
  end
end