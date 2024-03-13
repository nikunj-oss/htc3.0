document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');

    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const commentContent = document.getElementById('commentContent').value;

        try {
            const response = await fetch('/comments', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: JSON.stringify({ content: commentContent })
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const comment = await response.json();
            displayComment(comment);
        } catch (error) {
            console.error(error.message);
        }
    });

    async function displayComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = comment.content;

        const replyForm = document.createElement('form');
        const replyInput = document.createElement('textarea');
        replyInput.placeholder = 'Reply to this comment...';
        const replyButton = document.createElement('button');
        replyButton.textContent = 'Post Reply';

        replyForm.appendChild(replyInput);
        replyForm.appendChild(replyButton);
        commentElement.appendChild(replyForm);

        replyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const replyContent = replyInput.value;

            try {
                const response = await fetch(`/comments/${comment._id}/replies`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: replyContent })
                });

                if (!response.ok) {
                    throw new Error('Failed to post reply');
                }

                const reply = await response.json();
                displayReply(reply, commentElement);
            } catch (error) {
                console.error(error.message);
            }
        });

        commentsContainer.appendChild(commentElement);
    }

    function displayReply(reply, commentElement) {
        const replyElement = document.createElement('div');
        replyElement.classList.add('reply');
        replyElement.textContent = reply.content;
        commentElement.appendChild(replyElement);
    }

    // Fetch existing comments on page load
    window.addEventListener('load', async () => {
        try {
            const response = await fetch('/comments');
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const comments = await response.json();
            comments.forEach(comment => {
                displayComment(comment);
            });
        } catch (error) {
            console.error(error.message);
        }
    });
});
