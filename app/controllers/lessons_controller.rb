class LessonsController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  before_action :authenticate_teacher!, only: [:create]
  before_action :set_lesson, only: [:show]

  def index
    @lessons = Lesson.this_week(Time.zone.now)
  end

  # TODO
  def today
    @books = Book.today(Time.zone.now)
  end

  def show
  end

  def create
    @lesson = Lesson.find_or_initialize_by(
      teacher_id: current_teacher.id, start_at: Time.zone.parse(lesson_params[:start_at])
    )
    return render json: { status: :not_acceptable } if @lesson.book.present?

    # TODO
    if @lesson.persisted?
      @lesson.update aasm_state: lesson_params[:aasm_state]
    else
      @lesson.save
    end

    if @lesson.errors.empty?
      render :create
    else
      render json: @lesson.errors, status: :unprocessable_entity
    end
  end

  private

  def set_lesson
    @lesson = Lesson.find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(:teacher_id, :start_at, :attended, :aasm_state)
  end
end
