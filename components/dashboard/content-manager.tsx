"use client";

import * as React from "react";
import {
  updateProfile,
  updateSkillProficiency,
  createSkill,
  deleteSkill,
} from "@/features/content/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Cpu, Loader2, Minus, Plus, Save, Trash2, User } from "lucide-react";

interface ContentManagerProps {
  initialProfile: {
    fullName: string;
    title: string;
    headline: string;
    bio: string;
    location?: string | null;
  };
  categories: {
    id: string;
    name: string;
    skills: {
      id: string;
      name: string;
      proficiency: number;
      featured: boolean;
    }[];
  }[];
}

export function ContentManager({ initialProfile, categories }: ContentManagerProps) {
  // Profile state
  const [fullName, setFullName] = React.useState(initialProfile.fullName);
  const [title, setTitle] = React.useState(initialProfile.title);
  const [headline, setHeadline] = React.useState(initialProfile.headline);
  const [bio, setBio] = React.useState(initialProfile.bio);
  const [location, setLocation] = React.useState(initialProfile.location || "");
  const [profileSaving, setProfileSaving] = React.useState(false);
  const [profileSuccess, setProfileSuccess] = React.useState(false);

  // Skills state
  const [categoryList, setCategoryList] = React.useState(categories);
  const [skillDialogOpen, setSkillDialogOpen] = React.useState(false);
  const [newSkillName, setNewSkillName] = React.useState("");
  const [newSkillCategory, setNewSkillCategory] = React.useState(categories[0]?.id || "");
  const [newSkillProficiency, setNewSkillProficiency] = React.useState(85);
  const [skillSaving, setSkillSaving] = React.useState(false);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(false);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("title", title);
    formData.append("headline", headline);
    formData.append("bio", bio);
    formData.append("location", location);

    const res = await updateProfile(formData);
    setProfileSaving(false);
    if (res.success) {
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }
  }

  async function handleAdjustSkill(catId: string, skillId: string, delta: number) {
    let targetNewVal = 0;
    setCategoryList((prev) =>
      prev.map((c) => {
        if (c.id !== catId) return c;
        return {
          ...c,
          skills: c.skills.map((s) => {
            if (s.id !== skillId) return s;
            targetNewVal = Math.min(100, Math.max(10, s.proficiency + delta));
            return { ...s, proficiency: targetNewVal };
          }),
        };
      })
    );

    if (targetNewVal > 0) {
      await updateSkillProficiency(skillId, targetNewVal);
    }
  }

  async function handleDeleteSkill(catId: string, skillId: string) {
    if (!confirm("Remove this skill?")) return;

    setCategoryList((prev) =>
      prev.map((c) => {
        if (c.id !== catId) return c;
        return {
          ...c,
          skills: c.skills.filter((s) => s.id !== skillId),
        };
      })
    );

    await deleteSkill(skillId);
  }

  async function handleCreateSkill(e: React.FormEvent) {
    e.preventDefault();
    setSkillSaving(true);

    const formData = new FormData();
    formData.append("name", newSkillName);
    formData.append("categoryId", newSkillCategory);
    formData.append("proficiency", String(newSkillProficiency));
    formData.append("featured", "true");

    const res = await createSkill(formData);
    setSkillSaving(false);

    if (res.success && res.skill) {
      setCategoryList((prev) =>
        prev.map((c) => {
          if (c.id !== newSkillCategory) return c;
          return {
            ...c,
            skills: [...c.skills, res.skill as any],
          };
        })
      );
      setSkillDialogOpen(false);
      setNewSkillName("");
    }
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Profile & Skills Management
        </h1>
        <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1">
          Modify hero statements, biography information, and technical skill proficiencies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Profile Card */}
        <Card className="border-[var(--border)] bg-[var(--card)]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-[#7C3AED]" />
              Bio & Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {profileSuccess && (
                <div className="rounded-[10px] bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-600 dark:text-emerald-400">
                  Profile updated and audit diff recorded!
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  Professional Title / Role
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  One-Line Value Headline
                </label>
                <Input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  Location
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru, India"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--foreground)]">
                  Biography Statement
                </label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" disabled={profileSaving} className="w-full gap-2">
                {profileSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Profile Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card className="border-[var(--border)] bg-[var(--card)]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#7C3AED]" />
              Categorized Skills
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSkillDialogOpen(true)}
              className="gap-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Skill
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 pt-1">
            {categoryList.map((cat) => (
              <div key={cat.id} className="space-y-2">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#7C3AED] border-b border-[var(--border-subtle)] pb-1">
                  {cat.name}
                </h3>

                <div className="space-y-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between rounded-[8px] bg-[var(--surface)] p-2 text-xs"
                    >
                      <span className="font-semibold text-[var(--foreground)]">
                        {skill.name}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[var(--foreground-muted)] w-8 text-right">
                          {skill.proficiency}%
                        </span>
                        <button
                          onClick={() => handleAdjustSkill(cat.id, skill.id, -5)}
                          className="p-1 rounded hover:bg-[var(--surface-hover)]"
                          title="Decrease 5%"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleAdjustSkill(cat.id, skill.id, 5)}
                          className="p-1 rounded hover:bg-[var(--surface-hover)]"
                          title="Increase 5%"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(cat.id, skill.id)}
                          className="p-1 rounded hover:bg-red-500/10 text-red-500 ml-1"
                          title="Delete skill"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Add Skill Dialog */}
      <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Technical Skill</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSkill} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                Skill Name *
              </label>
              <Input
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. GraphQL, Kubernetes, Rust"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                Category *
              </label>
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="flex h-[44px] w-full rounded-[12px] border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)]"
              >
                {categoryList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--foreground)]">
                Initial Proficiency (1 - 100): {newSkillProficiency}%
              </label>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                className="w-full accent-[#7C3AED]"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSkillDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={skillSaving} className="gap-2">
                {skillSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                Add Skill
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
