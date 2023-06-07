# -------------- CREATE TASK COMMENT  --------------------
@tasks_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_task_comment(id):

    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    data = request.get_json()
    comment = data.get('comment')

    if not comment:
        return jsonify({'message': 'Invalid request body', 'statusCode': 400}), 400

    new_comment = TaskComment(
        user_id=current_user.id,
        task_id=id,
        comment=comment,
        created_at=datetime.utcnow()
    )
    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201
