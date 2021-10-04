from django.db import models
from django.contrib.auth.models import User


class Audit(models.Model):
    # user_register = models.CharField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    register_date = models.DateTimeField(auto_now=True)
    # user_modification = models.CharField(null=True)
    modification_date = models.DateTimeField(blank=True, null=True)
    # user_deletion = models.CharField(null=True)
    delete_date = models.DateTimeField(blank=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Post(Audit):
    description = models.CharField(null=False, max_length=150, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def number_comments(self):
        comments = Comments.objects.filter(post_comment=self)
        return len(comments)

    def number_reactions(self):
        reactions = Reactions.objects.filter(post_reaction=self)
        return len(reactions)


class Comments(Audit):
    comment_text = models.CharField(null=False, max_length=150, blank=False)
    post_comment = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Reactions(Audit):
    reaction_text = models.CharField(null=False, blank=False, max_length=30)
    post_reaction = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # class Meta:
    # unique_together = (('user', 'post'),)
    # index_together = (('user', 'post'),)
