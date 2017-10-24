json.extract! part, :id, :title, :report_id, :created_at, :updated_at
json.url user_report_part_url(current_user, @report, part, format: :json)
