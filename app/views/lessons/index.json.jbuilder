json.data do |json|
  json.array! @lessons do |lesson|
    json.id lesson.id
    json.teacher_id lesson.teacher_id
    json.start_at lesson.start_at
    json.canceled lesson.canceled
    json.book_id lesson.book.try(:id)
    json.user_id lesson.book.try(:user_id)
  end
end
